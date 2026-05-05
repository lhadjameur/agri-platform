'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, EnvelopeSimple, LockSimple, Eye, EyeSlash, WarningCircle } from '@phosphor-icons/react'

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
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
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Welcome back</h2>
          <p className="text-gray-400 text-sm">Login to your Agrivia account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm">
              <WarningCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email address</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <EnvelopeSimple size={18} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <a href="/forgot-password" className="text-xs text-green-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <LockSimple size={18} className="text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition mt-1"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>
        </div>

        {/* Footer Links */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-green-600 hover:underline font-medium">Register</a>
        </p>
        <p className="text-center mt-3">
          <a href="/admin/login" className="text-gray-400 text-xs hover:underline">Admin access →</a>
        </p>

      </div>
    </main>
  )
}