'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewListing() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Equipment',
    location: ''
  })
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setImages(files)
    setPreviews(files.map(file => URL.createObjectURL(file)))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let uploadedUrls = []

      for (const image of images) {
        const formData = new FormData()
        formData.append('file', image)
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const uploadData = await uploadRes.json()
        uploadedUrls.push(uploadData.url)
      }

      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ownerId: 1,
          imageUrl: uploadedUrls[0] || null,
          images: uploadedUrls
        })
      })

      const data = await res.json()
      if (res.ok) {
        router.push('/listings')
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Something went wrong')
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

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Photos (up to 4)</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition"
              onClick={() => document.getElementById('imageInput').click()}
            >
              {previews.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt={`Preview ${i+1}`} className="w-full h-32 object-cover rounded-lg"/>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-4xl mb-2">📸</p>
                  <p className="text-gray-500">Click to upload up to 4 photos</p>
                  <p className="text-gray-400 text-sm mt-1">JPG, PNG up to 10MB each</p>
                </div>
              )}
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImages}
            />
          </div>

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
            <label className="text-sm text-gray-600 mb-1 block">Location</label>
            <input
              type="text"
              placeholder="e.g. Warsaw, Poland"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.location}
              onChange={e => setForm({...form, location: e.target.value})}
            />
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