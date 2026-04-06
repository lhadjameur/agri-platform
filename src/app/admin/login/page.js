'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    <main className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Login to your AgriShare account</p>

        {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-green-600 hover:underline">Register</a>
        </p>
        <p className="text-center text-gray-500 mt-3">
          <a href="/admin/login" className="text-gray-400 text-sm hover:underline">Admin access →</a>
        </p>
      </div>
    </main>
  )
}