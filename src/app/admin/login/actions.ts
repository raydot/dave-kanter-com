'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export async function login(formData: FormData) {
  if (process.env.NODE_ENV === 'production') {
    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '15 m'),
    })

    const headerStore = await headers()
    const ip = headerStore.get('x-forwarded-for') ?? 'unknown'

    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return { error: 'Too many attempts. Try again later.' }
    }
  }

  const password = formData.get('password') as string

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Invalid password' }
  }

  const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET)
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  redirect('/admin/new')
}
