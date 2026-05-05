'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, EnvelopeSimple, CheckCircle, WarningCircle, ArrowLeft } from '@phosphor-icons/react'

export default function Verify() {
  const router = useRouter()
  const [pin, setPin] = useState(['', '', '', '', '', ''])
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(600)
  const inputs = useRef([])

  useEffect(() => {
    const savedEmail = localStorage.getItem('pendingEmail')
    if (!savedEmail) {
      router.push('/register')
    } else {
      setEmail(savedEmail)
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newPin = [...pin]
    newPin[index] = value.slice(-1)
    setPin(newPin)
    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullPin = pin.join('')
    if (fullPin.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pin: fullPin })
    })

    const data = await res.json()

    if (res.ok) {
      setSuccess(true)
      localStorage.removeItem('pendingEmail')
      setTimeout(() => router.push('/login'), 3000)
    } else {
      setError(data.error || 'Something went wrong')
    }
    setLoading(false)
  }

  const handleResend = async () => {
    setResending(true)
    const savedData = localStorage.getItem('pendingRegistration')
    if (savedData) {
      const { name, password, role } = JSON.parse(savedData)
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      })
      setCountdown(600)
      setPin(['', '', '', '', '', ''])
    }
    setResending(false)
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

          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <EnvelopeSimple size={32} weight="light" className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
                <p className="text-gray-400 text-sm">
                  We sent a 6-digit verification code to
                </p>
                <p className="text-gray-700 font-semibold text-sm mt-1">{email}</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl mb-5 text-sm">
                  <WarningCircle size={16} weight="fill" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* PIN Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block text-center">
                    Enter verification code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {pin.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => inputs.current[i] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleChange(i, e.target.value)}
                        onKeyDown={e => handleKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                      />
                    ))}
                  </div>
                </div>

                {/* Countdown */}
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-gray-400 text-sm">
                      Code expires in{' '}
                      <span className="text-green-600 font-semibold">{formatTime(countdown)}</span>
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm">Code has expired. Please resend.</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || countdown === 0}
                  className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition text-sm"
                >
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>

              </form>

              {/* Footer */}
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResend}
                    disabled={resending || countdown > 540}
                    className="text-green-600 hover:underline disabled:opacity-40 font-medium"
                  >
                    {resending ? 'Sending...' : 'Resend code'}
                  </button>
                </p>
                <a href="/register" className="flex items-center justify-center gap-1 text-gray-400 text-sm hover:text-gray-600 mt-3 transition">
                  <ArrowLeft size={14} />
                  Back to Register
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} weight="fill" className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
              <p className="text-gray-400 text-sm">Welcome to Agrivia! Redirecting to login...</p>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}