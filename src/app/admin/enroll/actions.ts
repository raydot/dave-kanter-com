'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { STEP_UP_COOKIE, STEP_UP_TTL_SECONDS, enrollStepUpClaims } from '@/lib/admin-auth'
import { passwordAttemptRateLimited } from '@/lib/admin-password'

// Proves the password again, right now, regardless of whether admin_token
// is already valid. Registering a passkey mints a permanent credential, so
// an existing session cookie — which could be stolen without the password
// ever being known — isn't enough on its own to do that.
export async function stepUpForEnroll(formData: FormData): Promise<{ error?: string } | void> {
  if (await passwordAttemptRateLimited()) {
    return { error: 'Too many attempts. Try again later.' }
  }

  const password = formData.get('password') as string

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Invalid password' }
  }

  const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET)
  const token = await new SignJWT(enrollStepUpClaims())
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(`${STEP_UP_TTL_SECONDS}s`)
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set(STEP_UP_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: STEP_UP_TTL_SECONDS,
    path: '/',
  })
}
