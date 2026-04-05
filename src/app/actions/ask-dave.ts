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

    let rateLimitResult
    try {
      rateLimitResult = await ratelimit.limit(ip)
    } catch (error) {
      console.error('Rate limit error:', error)
      return {
        success: false,
        message:
          'Rate limiting service unavailable. Please check Redis configuration.',
      }
    }

    const { success, remaining } = rateLimitResult

    if (!success) {
      return {
        success: false,
        message: `Rate limit exceeded. You can ask ${remaining} more questions. Please try again later.`,
        remaining,
      }
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `${daveContext}\n\nUser Question: ${question}`,
        },
      ],
      temperature: 0.7,
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
