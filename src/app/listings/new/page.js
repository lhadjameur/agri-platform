'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewListing() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Equipment'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ownerId: 1 })
    })

    const data = await res.json()
    if (res.ok) {
      router.push('/listings')
    } else {
      setError(data.error || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-green-50">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-green-700">🌱 AgriShare</a>
        <a href="/listings" className="text-green-600 hover:underline">← Back to Listings</a>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Add New Listing</h2>

        {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Title</label>
            <input
              type="text"
              placeholder="e.g. John Deere Tractor for Rent"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Category</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
            >
              <option value="Equipment">Equipment</option>
              <option value="Land">Land</option>
              <option value="Labor">Labor</option>
              <option value="Advisory">Advisory</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Description</label>
            <textarea
              placeholder="Describe your resource in detail..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Price per day ($)</label>
            <input
              type="number"
              placeholder="e.g. 50"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>
    </main>
  )
}