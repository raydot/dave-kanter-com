'use client'

import { startAuthentication } from '@simplewebauthn/browser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [working, setWorking] = useState(false)

  async function handleLogin() {
    setError('')
    setWorking(true)

    try {
      const optRes = await fetch('/api/webauthn/auth-options')
      if (!optRes.ok) throw new Error(await optRes.text())
      const options = await optRes.json()

      const authResult = await startAuthentication({ optionsJSON: options })

      const verRes = await fetch('/api/webauthn/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authResult),
      })

      if (!verRes.ok) {
        const data = await verRes.json()
        throw new Error(data.error ?? 'Authentication failed')
      }

      router.push('/admin/new')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
      setWorking(false)
    }
  }

  return (
    <div className="tw-min-h-screen tw-bg-background tw-flex tw-items-center tw-justify-center">
      <div className="tw-w-full tw-max-w-sm tw-p-8 tw-flex tw-flex-col tw-items-center tw-gap-6">
        <h1 className="tw-text-2xl tw-font-bold">Admin</h1>
        <button
          onClick={handleLogin}
          disabled={working}
          className="tw-w-full tw-py-3 tw-bg-primary tw-text-primary-foreground tw-rounded hover:tw-opacity-90 tw-text-lg disabled:tw-opacity-50"
        >
          {working ? 'Waiting for biometric…' : '🔑 Use Fingerprint'}
        </button>
        {error && <p className="tw-text-red-500 tw-text-sm tw-text-center">{error}</p>}
      </div>
    </div>
  )
}
