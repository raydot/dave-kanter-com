import { jwtVerify } from 'jose'

// Both cookies are HS256 JWTs signed with the same secret, so a `purpose`
// claim is what actually keeps them from being interchangeable — without
// it, a leaked 5-minute step-up token would verify fine as a 30-day
// admin_token, and (worse) a stolen admin_token would satisfy the step-up
// check it exists specifically to require something more than.
const ADMIN_SESSION_PURPOSE = 'admin-session'
const ENROLL_STEP_UP_PURPOSE = 'enroll-stepup'

export const STEP_UP_COOKIE = 'enroll_stepup'
export const STEP_UP_TTL_SECONDS = 5 * 60

async function verifyPurpose(token: string | undefined, purpose: string): Promise<boolean> {
  if (!token) return false

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload.purpose === purpose
  } catch {
    return false
  }
}

// Shared by the middleware (edge runtime) and by route handlers, so the
// token check can't drift between the two layers.
export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  return verifyPurpose(token, ADMIN_SESSION_PURPOSE)
}

export async function verifyStepUpToken(token: string | undefined): Promise<boolean> {
  return verifyPurpose(token, ENROLL_STEP_UP_PURPOSE)
}

export function adminSessionClaims() {
  return { purpose: ADMIN_SESSION_PURPOSE }
}

export function enrollStepUpClaims() {
  return { purpose: ENROLL_STEP_UP_PURPOSE }
}

// /admin/enroll and its two API routes are gated on this flag alone — an
// existing admin_token is never sufficient (see verifyStepUpToken above).
// It exists for the cold-start case: with no admin_token and no passkey
// yet, there's otherwise no way to reach the one page that mints the
// first credential. Gated on NODE_ENV as well as the flag, so it can't
// take effect in production even if left set to 1.
export function enrollOpen(): boolean {
  return process.env.ADMIN_ENROLL_OPEN === '1' && process.env.NODE_ENV !== 'production'
}
