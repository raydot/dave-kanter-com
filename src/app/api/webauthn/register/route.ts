import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { CHALLENGE_KEY, getRedis, getSupabase, origin, rpID } from '@/lib/webauthn'

export async function POST(request: Request) {
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
}
