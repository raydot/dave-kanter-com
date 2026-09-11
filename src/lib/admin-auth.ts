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
