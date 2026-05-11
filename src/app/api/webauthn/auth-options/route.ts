import { generateAuthenticationOptions } from '@simplewebauthn/server'
import { CHALLENGE_KEY, CHALLENGE_TTL, getRedis, getSupabase, rpID } from '@/lib/webauthn'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = getSupabase()
  const redis = getRedis()

  const { data: credentials } = await supabase
    .from('webauthn_credentials')
    .select('credential_id')

  const allowCredentials = (credentials ?? []).map((row: { credential_id: string }) => ({
    id: row.credential_id,
  }))

  const options = await generateAuthenticationOptions({
    rpID,
    allowCredentials,
    userVerification: 'preferred',
  })

  await redis.set(CHALLENGE_KEY, options.challenge, { ex: CHALLENGE_TTL })

  return Response.json(options)
}
