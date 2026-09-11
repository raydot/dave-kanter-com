import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Admin CRUD API routes — everything here mutates or exposes unpublished
// content and must require the same admin_token as the /admin UI itself.
// /api/webauthn/* is deliberately excluded: it's the login mechanism.
const PROTECTED_API_PREFIXES = ['/api/posts', '/api/tags']

async function hasValidAdminToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return false

  try {
    const secret = new TextEncoder().encode(process.env.ADMIN_COOKIE_SECRET)
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (await hasValidAdminToken(request)) {
      return NextResponse.next()
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (pathname === '/admin/login' || pathname === '/admin/enroll') {
    return NextResponse.next()
  }

  if (await hasValidAdminToken(request)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/admin/login', request.url))
}

export const config = {
  matcher: ['/admin/:path*', '/api/posts/:path*', '/api/tags/:path*'],
}
