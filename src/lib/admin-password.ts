import { headers } from 'next/headers'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Shared by every server action that checks ADMIN_PASSWORD (login,
// enroll's step-up re-auth) so they draw against one budget per IP —
// otherwise an attacker gets 5 guesses per endpoint instead of 5 total.
export async function passwordAttemptRateLimited(): Promise<boolean> {
  if (process.env.NODE_ENV !== 'production') return false

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '15 m'),
    prefix: 'admin-password-attempt',
  })

  const headerStore = await headers()
  const ip = headerStore.get('x-forwarded-for') ?? 'unknown'

  const { success } = await ratelimit.limit(ip)
  return !success
}
