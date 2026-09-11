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
      setMessage('Passkey registered. You can now sign in with it at /admin/login.')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 480 }}>
      <h1>Register Passkey</h1>
      <p>
        Adds a passkey for this device. Requires an existing admin session, so
        sign in with the password first.
      </p>
      <button
        onClick={handleEnroll}
        disabled={status === 'working' || status === 'done'}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
      >
        {status === 'working' ? 'Waiting for biometric…' : 'Register Passkey'}
      </button>
      {message && (
        <p style={{ marginTop: '1rem', color: status === 'error' ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  )
}
