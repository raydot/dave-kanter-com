import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { cookies } from 'next/headers'
import { CHALLENGE_KEY, getRedis, getSupabase, origin, rpID } from '@/lib/webauthn'
import { verifyAdminToken, enrollBypassActive } from '@/lib/admin-auth'

export async function POST(request: Request) {
  // Checked in the middleware too; repeated here because this endpoint
  // mints a permanent credential. enrollBypassActive() is the same
  // ADMIN_ENROLL_OPEN escape hatch the middleware honors.
  const token = (await cookies()).get('admin_token')?.value
  if (!enrollBypassActive() && !(await verifyAdminToken(token))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const redis = getRedis()
    const supabase = getSupabase()

    const challenge = await redis.get<string>(CHALLENGE_KEY)
    if (!challenge) {
      return Response.json({ error: 'Challenge expired or missing' }, { status: 400 })
    }

    const body = await request.json()

    let verification
    try {
      verification = await verifyRegistrationResponse({
        response: body,
        expectedChallenge: challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed'
      return Response.json({ error: message }, { status: 400 })
    }

    if (!verification.verified || !verification.registrationInfo) {
      return Response.json({ error: 'Registration not verified' }, { status: 400 })
    }

    await redis.del(CHALLENGE_KEY)

    const { credential } = verification.registrationInfo

    const { error } = await supabase.from('webauthn_credentials').insert({
      credential_id: credential.id,
      public_key: Buffer.from(credential.publicKey).toString('base64url'),
      counter: credential.counter,
    })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[webauthn/register] Unexpected error during registration:', err)
    const message = err instanceof Error ? err.message : 'Registration failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
