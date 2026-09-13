import { cookies } from 'next/headers'
import { STEP_UP_COOKIE, verifyStepUpToken } from '@/lib/admin-auth'
import EnrollForm from './EnrollForm'
import StepUpForm from './StepUpForm'

// Reachable only while ADMIN_ENROLL_OPEN=1 (enforced in src/proxy.ts,
// before this ever renders). Getting here doesn't grant registration by
// itself, though — that additionally requires the step-up cookie below,
// re-proven via the password on every visit (it's short-lived), so a
// standing admin_token session is never sufficient on its own.
export default async function EnrollPage() {
  const token = (await cookies()).get(STEP_UP_COOKIE)?.value
  const steppedUp = await verifyStepUpToken(token)

  return (
    <div style={{ padding: '2rem', maxWidth: 480 }}>
      <h1>Register Passkey</h1>
      {steppedUp ? <EnrollForm /> : <StepUpForm />}
    </div>
  )
}
