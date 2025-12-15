'use server'

import { Resend } from 'resend'
import { contactRatelimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: {
  name: string
  email: string
  message: string
}): Promise<{
  success: boolean
  message: string
  remaining?: number
}> {
  try {
    // Input validation
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'All fields are required.',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      }
    }

    // Length validation
    if (formData.name.length > 100) {
      return {
        success: false,
        message: 'Name must be less than 100 characters.',
      }
    }

    if (formData.email.length > 100) {
      return {
        success: false,
        message: 'Email must be less than 100 characters.',
      }
    }

    if (formData.message.length > 1000) {
      return {
        success: false,
        message: 'Message must be less than 1000 characters.',
      }
    }

    if (formData.message.length < 10) {
      return {
        success: false,
        message: 'Message must be at least 10 characters.',
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
      rateLimitResult = await contactRatelimit.limit(ip)
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
        message: `Rate limit exceeded. You have ${remaining} submissions remaining. Please try again later.`,
        remaining,
      }
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Contact Form <incoming@davekanter.com>',
      to: ['raydot@gmail.com'],
      replyTo: formData.email,
      subject: `Contact Form: ${formData.name}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
      }
    }

    return {
      success: true,
      message: 'Thank you! Your message has been sent.',
      remaining,
    }
  } catch (error) {
    console.error('Error in submitContactForm:', error)
    return {
      success: false,
      message: 'Sorry, there was an error. Please try again later.',
    }
  }
}
