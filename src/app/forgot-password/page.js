'use client'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    const data = await res.json()

    if (res.ok) {
      setSent(true)
    } else {
      setError(data.error || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold text-green-700">🌱 AgriShare</a>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Forgot Password?</h2>
          <p className="text-gray-500 mt-2">Enter your email and we'll send you a reset link</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Check your email!</h3>
            <p className="text-gray-500 mb-6">
              If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
            <a href="/login" className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 inline-block">
              Back to Login
            </a>
          </div>
        ) : (
          <>
            {error && <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Remember your password?{' '}
              <a href="/login" className="text-green-600 hover:underline">Login</a>
            </p>
          </>
        )}
      </div>
    </main>
  )
}