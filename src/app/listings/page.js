'use client'
import { useState, useEffect } from 'react'

export default function Listings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        setListings(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
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

        {loading && <p className="text-gray-500">Loading listings...</p>}

        {!loading && listings.length === 0 && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🌾</p>
            <p className="text-xl text-gray-500 mb-6">No listings yet. Be the first to add one!</p>
            <a href="/listings/new" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
              Add First Listing
            </a>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                {listing.category}
              </span>
              <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">{listing.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{listing.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-700 font-bold text-lg">${listing.price}/day</span>
                <a href={`/listings/${listing.id}`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}