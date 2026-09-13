'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { stepUpForEnroll } from './actions'

export default function StepUpForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError('')
    setPending(true)

    const result = await stepUpForEnroll(formData)

    if (result?.error) {
      setError(result.error)
      setPending(false)
      return
    }

    // The step-up cookie is set; re-run the server component so it picks
    // up the new cookie and swaps this form for EnrollForm.
    router.refresh()
  }

  return (
    <>
      <p>
        Re-enter the admin password to continue.
      </p>
      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 320 }}>
        <input
          type="password"
          name="password"
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          disabled={pending}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          {pending ? 'Checking…' : 'Continue'}
        </button>
      </form>
    </>
  )
}
