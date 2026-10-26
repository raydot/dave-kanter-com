'use server'

import Anthropic from '@anthropic-ai/sdk'
import { daveContext } from '@/app/data/dave-context'
import { ratelimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function askDave(question: string): Promise<{
  success: boolean
  message: string
  remaining?: number
}> {
  try {
    // Input validation
    if (!question || question.trim().length === 0) {
      return {
        success: false,
        message: 'Please enter a question.',
      }
    }

    if (question.length > 500) {
      return {
        success: false,
        message: 'Question is too long. Please keep it under 500 characters.',
      }
    }

    // Rate limiting
    const headersList = await headers()
    const forwarded = headersList.get('x-forwarded-for')
    const realIP = headersList.get('x-real-ip')
    const cfConnectingIP = headersList.get('cf-connecting-ip')

    const ip =
      cfConnectingIP || realIP || forwarded?.split(',')[0].trim() || 'unknown'

    // Fail open on a rate-limit-service outage: this is a low-traffic site
    // with a hard 500-char input cap, so an unthrottled burst during a rare
    // Redis blip is cheap. Blocking every visitor (and leaking infra detail
    // to them) is the worse failure mode. Log it so a sustained outage is
    // still visible server-side.
    let remaining: number | undefined
    try {
      const rateLimitResult = await ratelimit.limit(ip)
      if (!rateLimitResult.success) {
        return {
          success: false,
          message:
            "I'd love to talk more, but I've hit my hourly limit. Let's take a little break and try again later.",
          remaining: rateLimitResult.remaining,
        }
      }
      remaining = rateLimitResult.remaining
    } catch (error) {
      console.error('Rate limit check failed, allowing request through:', error)
    }

    // Call Claude API. daveContext lives in `system` (not concatenated into
    // the user turn) with cache_control so the ~350-line bio is cached
    // instead of re-billed as full-price input on every question.
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: daveContext,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    })

    const answer = response.content[0]

    if (answer.type === 'text') {
      return {
        success: true,
        message: answer.text,
        remaining,
      }
    }

    return {
      success: false,
      message: 'Sorry, I encountered an error processing your question.',
    }
  } catch (error) {
    console.error('Error in askDave:', error)
    return {
      success: false,
      message: 'Sorry, I encountered an error. Please try again later.',
    }
  }
}
