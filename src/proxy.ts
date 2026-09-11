import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/admin-auth'

// Everything here either mutates content or mints credentials, so it needs
// the same admin_token as the /admin UI. /api/webauthn/register* is included
// because registering a passkey creates a permanent way in; only the login
// routes (/api/webauthn/auth*) stay open, or there'd be no way to sign in.
const PROTECTED_API_PREFIXES = [
  '/api/posts',
  '/api/tags',
  '/api/webauthn/register',
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('admin_token')?.value

  if (PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (await verifyAdminToken(token)) {
      return NextResponse.next()
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (await verifyAdminToken(token)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/admin/login', request.url))
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/posts/:path*',
    '/api/tags/:path*',
    '/api/webauthn/register',
    '/api/webauthn/register-options',
  ],
}
