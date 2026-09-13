import { jwtVerify } from 'jose'

// Shared by the middleware (edge runtime) and by route handlers, so the
// token check can't drift between the two layers.
export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET)
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

// Local-only escape hatch for the enroll chicken-and-egg problem: with no
// admin_token yet, there's no UI path to reach /admin/enroll (it requires a
// session) to mint the first passkey. Set ADMIN_ENROLL_OPEN=1 to skip the
// admin_token check on /admin/enroll and its two API routes, register a
// credential, then unset it (or set back to 0). Gated on NODE_ENV as well
// as the flag, so it can't take effect in production even if left set.
export function enrollBypassActive(): boolean {
  return process.env.ADMIN_ENROLL_OPEN === '1' && process.env.NODE_ENV !== 'production'
}
