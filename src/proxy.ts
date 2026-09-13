import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken, enrollOpen } from '@/lib/admin-auth'

// Everything here mutates content, so it needs a valid admin_token. The
// enroll surface (mints a permanent credential) is deliberately NOT in
// this list — an admin_token is never sufficient for it, see below.
const PROTECTED_API_PREFIXES = ['/api/posts', '/api/tags']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin/enroll and its two API routes: gated on ADMIN_ENROLL_OPEN
  // alone, full stop. An existing admin_token session does not get you in
  // here — registering a passkey mints a permanent credential, so a
  // session that could be stolen without ever exposing the password
  // isn't enough on its own to do that. (The page additionally requires
  // re-proving the password via the step-up cookie before it lets
  // registration proceed — see src/app/admin/enroll/page.tsx and the two
  // webauthn/register* routes, which each check that independently, same
  // defense-in-depth pattern as admin_token being re-checked in route
  // handlers below.)
  const isEnrollSurface = pathname === '/admin/enroll' || pathname.startsWith('/api/webauthn/register')

  if (isEnrollSurface) {
    if (enrollOpen()) {
      return NextResponse.next()
    }
    return pathname === '/admin/enroll'
      ? NextResponse.redirect(new URL('/admin/login', request.url))
      : NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
