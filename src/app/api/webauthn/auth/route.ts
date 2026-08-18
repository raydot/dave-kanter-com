import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { CHALLENGE_KEY, getRedis, getSupabase, origin, rpID } from '@/lib/webauthn'

export async function POST(request: Request) {
  try {
    const redis = getRedis()
    const supabase = getSupabase()

    const challenge = await redis.get<string>(CHALLENGE_KEY)
    if (!challenge) {
      return Response.json({ error: 'Challenge expired or missing' }, { status: 400 })
    }

    const body = await request.json()

    const { data: credRow, error: fetchError } = await supabase
      .from('webauthn_credentials')
      .select('credential_id, public_key, counter')
      .eq('credential_id', body.id)
      .single()

    if (fetchError || !credRow) {
      return Response.json({ error: 'Credential not found' }, { status: 400 })
    }

    let verification
    try {
      verification = await verifyAuthenticationResponse({
        response: body,
        expectedChallenge: challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: {
          id: credRow.credential_id,
          publicKey: Buffer.from(credRow.public_key, 'base64url'),
          counter: credRow.counter,
        },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed'
      return Response.json({ error: message }, { status: 400 })
    }

    if (!verification.verified) {
      return Response.json({ error: 'Authentication not verified' }, { status: 400 })
    }

    await redis.del(CHALLENGE_KEY)

    await supabase
      .from('webauthn_credentials')
      .update({ counter: verification.authenticationInfo.newCounter })
      .eq('credential_id', credRow.credential_id)

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

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[webauthn/auth] Unexpected error during authentication:', err)
    const message = err instanceof Error ? err.message : 'Authentication failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
