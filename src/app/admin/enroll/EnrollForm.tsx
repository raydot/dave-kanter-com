'use client'

import { startRegistration } from '@simplewebauthn/browser'
import { useState } from 'react'

export default function EnrollForm() {
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
    <>
      <p>Password verified. Adds a passkey for this device.</p>
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
    </>
  )
}
