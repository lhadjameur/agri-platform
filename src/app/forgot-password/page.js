'use client'
import { useState } from 'react'
import { Leaf, EnvelopeSimple, WarningCircle, CheckCircle, ArrowLeft } from '@phosphor-icons/react'

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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <Leaf size={32} weight="fill" className="text-green-600" />
            <span className="text-2xl font-bold text-gray-900">Agrivia</span>
          </a>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} weight="fill" className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email!</h3>
              <p className="text-gray-400 text-sm mb-6">
                If an account exists for <span className="font-medium text-gray-700">{email}</span>, you will receive a password reset link shortly.
              </p>
              <a href="/login" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 inline-block text-sm transition">
                Back to Login
              </a>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Forgot Password?</h2>
                <p className="text-gray-400 text-sm">Enter your email and we will send you a reset link</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl mb-5 text-sm">
                  <WarningCircle size={16} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                    <EnvelopeSimple size={18} className="text-gray-400" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition text-sm"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer Link */}
        {!sent && (
          <p className="text-center text-gray-400 text-sm mt-6">
            Remember your password?{' '}
            <a href="/login" className="text-green-600 hover:underline font-medium">Login</a>
          </p>
        )}

      </div>
    </main>
  )
}