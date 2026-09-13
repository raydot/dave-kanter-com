import { generateRegistrationOptions } from '@simplewebauthn/server'
import { cookies } from 'next/headers'
import { CHALLENGE_KEY, CHALLENGE_TTL, getRedis, getSupabase, rpID, rpName } from '@/lib/webauthn'
import { verifyAdminToken, enrollBypassActive } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Checked in the middleware too; repeated here because this endpoint
  // leads to minting a permanent credential. enrollBypassActive() is the
  // same ADMIN_ENROLL_OPEN escape hatch the middleware honors.
  const token = (await cookies()).get('admin_token')?.value
  if (!enrollBypassActive() && !(await verifyAdminToken(token))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getSupabase()
    const redis = getRedis()

    const { data: existing } = await supabase
      .from('webauthn_credentials')
      .select('credential_id')

    const excludeCredentials = (existing ?? []).map((row: { credential_id: string }) => ({
      id: row.credential_id,
    }))

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userName: 'admin',
      userDisplayName: 'Admin',
      attestationType: 'none',
      excludeCredentials,
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
      },
    })

    await redis.set(CHALLENGE_KEY, options.challenge, { ex: CHALLENGE_TTL })

    return Response.json(options)
  } catch (err) {
    console.error('[webauthn/register-options] Failed to generate registration options:', err)
    const message = err instanceof Error ? err.message : 'Failed to generate registration options'
    return Response.json({ error: message }, { status: 500 })
  }
}
