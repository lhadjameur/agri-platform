'use client'
import { useState, useEffect } from 'react'

export default function Listings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')

  const fetchListings = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (category) params.append('category', category)
    if (location) params.append('location', location)

    fetch(`/api/listings?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setListings(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchListings()
  }, [])

  return (
    <main className="min-h-screen bg-green-50">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-green-700">🌱 AgriShare</a>
        <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Listing
        </a>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Available Resources</h2>

        <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search listings..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 col-span-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Equipment">Equipment</option>
            <option value="Land">Land</option>
            <option value="Labor">Labor</option>
            <option value="Advisory">Advisory</option>
          </select>
          <input
            type="text"
            placeholder="📍 Filter by location..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <button
            onClick={fetchListings}
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 font-medium"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading listings...</p>}

        {!loading && listings.length === 0 && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🌾</p>
            <p className="text-xl text-gray-500 mb-6">No listings found. Try a different search!</p>
            <a href="/listings/new" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
              Add First Listing
            </a>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
              {listing.imageUrl ? (
                <img src={listing.imageUrl} alt={listing.title} className="w-full h-48 object-cover"/>
              ) : (
                <div className="w-full h-48 bg-green-100 flex items-center justify-center text-5xl">
                  🌾
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                    {listing.category}
                  </span>
                  {listing.location && (
                    <span className="text-gray-400 text-sm">📍 {listing.location}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">{listing.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{listing.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-bold text-lg">${listing.price}/day</span>
                  <a href={`/listings/${listing.id}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}