'use client'

import { login } from './actions'
import { useState } from 'react'

export default function LoginPage() {
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await login(formData)
    if (result?.error) setError(result.error)
  }

  return (
    <div className="tw-min-h-screen tw-bg-background tw-flex tw-items-center tw-justify-center">
      <div className="tw-w-full tw-max-w-sm tw-p-8">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Admin</h1>
        <form action={handleSubmit} className="tw-space-y-4">
          <input
            type="password"
            name="password"
            autoFocus
            autoComplete="current-password"
            placeholder="Password"
            className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
          />
          {error && <p className="tw-text-red-500 tw-text-sm">{error}</p>}
          <button
            type="submit"
            className="tw-w-full tw-py-2 tw-bg-primary tw-text-primary-foreground tw-rounded hover:tw-opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
