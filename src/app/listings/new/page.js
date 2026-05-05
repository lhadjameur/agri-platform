'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Leaf, ArrowLeft, Camera, TextT, Tag,
  MapPin, AlignLeft, CurrencyDollar, WarningCircle, Spinner, X, Plus
} from '@phosphor-icons/react'

export default function NewListing() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    pricePeriod: 'day',
    category: 'Equipment',
    location: ''
  })
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
  }, [])

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setImages(files)
    setPreviews(files.map(file => URL.createObjectURL(file)))
  }

  const getCurrencySymbol = (currency) => {
    if (currency === 'EUR') return '€'
    if (currency === 'PLN') return 'zł'
    return '$'
  }

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase().replace(/\s+/g, '-')
      if (!tags.includes(newTag) && tags.length < 10) {
        setTags([...tags, newTag])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove))
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
          ownerId: currentUser ? Number(currentUser.id) : 1,
          imageUrl: uploadedUrls[0] || null,
          images: uploadedUrls,
          tags
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
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2">
          <Leaf size={26} weight="fill" className="text-green-600" />
          <span className="text-xl font-bold text-gray-900">Agrivia</span>
        </a>
        <a href="/listings" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition">
          <ArrowLeft size={16} />
          Back to Listings
        </a>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Listing</h2>
          <p className="text-gray-400 text-sm mt-1">Share your agricultural resource with the community</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            <WarningCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col gap-6">

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Photos (up to 4)</label>
            <div
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition"
              onClick={() => document.getElementById('imageInput').click()}
            >
              {previews.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {previews.map((src, i) => (
                    <img key={i} src={src} alt={`Preview ${i+1}`} className="w-full h-32 object-cover rounded-xl"/>
                  ))}
                </div>
              ) : (
                <div className="py-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Camera size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Click to upload photos</p>
                  <p className="text-gray-400 text-xs mt-1">Up to 4 photos · JPG, PNG up to 10MB each</p>
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

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Title</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
              <TextT size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="e.g. John Deere Tractor for Rent"
                className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Category</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
              <Tag size={16} className="text-gray-400" />
              <select
                className="flex-1 focus:outline-none text-sm text-gray-700 bg-transparent"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option value="Equipment">Equipment</option>
                <option value="Land">Land</option>
                <option value="Labor">Labor</option>
                <option value="Advisory">Advisory</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Location</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
              <MapPin size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Warsaw, Poland"
                className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Description</label>
            <div className="flex items-start gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
              <AlignLeft size={16} className="text-gray-400 mt-0.5" />
              <textarea
                placeholder="Describe your resource in detail..."
                className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400 h-28 resize-none"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Tags
              <span className="text-gray-400 font-normal ml-2">— Press Enter or comma to add (max 10)</span>
            </label>
            <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-500 transition"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder={tags.length < 10 ? "e.g. tractor, organic, seasonal..." : "Maximum 10 tags reached"}
                className="w-full focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                disabled={tags.length >= 10}
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">{tags.length}/10 tags added</p>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Price</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <CurrencyDollar size={16} className="text-gray-400" />
                <input
                  type="number"
                  placeholder="50"
                  className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                  value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                  required
                />
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <select
                  className="flex-1 focus:outline-none text-sm text-gray-700 bg-transparent"
                  value={form.currency}
                  onChange={e => setForm({...form, currency: e.target.value})}
                >
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="PLN">zł PLN</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                <select
                  className="flex-1 focus:outline-none text-sm text-gray-700 bg-transparent"
                  value={form.pricePeriod}
                  onChange={e => setForm({...form, pricePeriod: e.target.value})}
                >
                  <option value="day">Per Day</option>
                  <option value="month">Per Month</option>
                  <option value="year">Per Year</option>
                </select>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Preview: {getCurrencySymbol(form.currency)}{form.price || '0'} / {form.pricePeriod}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner size={18} className="animate-spin" />
                Publishing...
              </>
            ) : (
              'Publish Listing'
            )}
          </button>

        </form>
      </div>
    </main>
  )
}