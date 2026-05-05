'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, EnvelopeSimple, LockSimple, Eye, EyeSlash, WarningCircle, ShieldCheck } from '@phosphor-icons/react'

export default function AdminLogin() {
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
      if (data.user.role === 'admin') {
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/admin')
      } else {
        setError('Access denied. This page is for admins only.')
      }
    } else {
      setError(data.error || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <Leaf size={32} weight="fill" className="text-green-500" />
            <span className="text-2xl font-bold text-white">Agrivia</span>
          </a>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Admin Access</h2>
              <p className="text-gray-400 text-xs">Agrivia Administration Panel</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl mb-5 text-sm">
              <WarningCircle size={16} weight="fill" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Admin Email</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <EnvelopeSimple size={18} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@agrivia.com"
                  className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <LockSimple size={18} className="text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
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
              className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition text-sm mt-1"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>

          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6">
          <a href="/" className="text-gray-500 text-sm hover:text-gray-300 transition flex items-center justify-center gap-1">
            ← Back to Agrivia
          </a>
        </p>

      </div>
    </main>
  )
}