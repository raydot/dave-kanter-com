'use client'

import { startRegistration } from '@simplewebauthn/browser'
import { useState } from 'react'

export default function EnrollPage() {
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleEnroll() {
    setStatus('working')
    setMessage('')

    try {
      const optRes = await fetch('/api/webauthn/register-options')
      if (!optRes.ok) {
        const data = await optRes.json().catch(() => ({}))
        throw new Error(data.error ?? 'Failed to start registration')
      }
      const options = await optRes.json()

      const regResult = await startRegistration({ optionsJSON: options })

      const verRes = await fetch('/api/webauthn/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regResult),
      })

      if (!verRes.ok) {
        const data = await verRes.json()
        throw new Error(data.error ?? 'Registration failed')
      }

      setStatus('done')
      setMessage('Fingerprint enrolled. You can now log in at /admin/login.')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 480 }}>
      <h1>Enroll Fingerprint</h1>
      <p>One-time setup. After enrollment, delete or ignore this page.</p>
      {process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_ENROLL_OPEN && (
        <p style={{ color: 'red' }}>
          Set <code>NEXT_PUBLIC_ENROLL_OPEN=1</code> in env to enable this page in production.
        </p>
      )}
      <button
        onClick={handleEnroll}
        disabled={status === 'working' || status === 'done'}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
      >
        {status === 'working' ? 'Waiting for biometric…' : 'Enroll Fingerprint'}
      </button>
      {message && (
        <p style={{ marginTop: '1rem', color: status === 'error' ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  )
}
