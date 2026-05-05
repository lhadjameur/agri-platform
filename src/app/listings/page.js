'use client'
import { useState, useEffect } from 'react'
import { Leaf, MagnifyingGlass, MapPin, Plus, SquaresFour, Spinner } from '@phosphor-icons/react'

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

  const getCurrencySymbol = (currency) => {
    if (currency === 'EUR') return '€'
    if (currency === 'PLN') return 'zł'
    return '$'
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2">
          <Leaf size={26} weight="fill" className="text-green-600" />
          <span className="text-xl font-bold text-gray-900">Agrivia</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium text-sm">My Dashboard</a>
          <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm font-medium flex items-center gap-2 transition">
            <Plus size={16} weight="bold" />
            Add Listing
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Available Resources</h2>
          <p className="text-gray-400 mt-2">Find and rent agricultural resources near you</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8 flex gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2">
            <MagnifyingGlass size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search listings..."
              className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchListings()}
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2">
            <SquaresFour size={18} className="text-gray-400" />
            <select
              className="focus:outline-none text-sm text-gray-700 bg-transparent"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Equipment">Equipment</option>
              <option value="Land">Land</option>
              <option value="Labor">Labor</option>
              <option value="Advisory">Advisory</option>
            </select>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2">
            <MapPin size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Location..."
              className="focus:outline-none text-sm text-gray-700 placeholder-gray-400 w-32"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <button
            onClick={fetchListings}
            className="bg-green-600 text-white rounded-xl px-6 py-2 hover:bg-green-700 font-medium text-sm transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Spinner size={32} className="text-green-600 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf size={40} weight="light" className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No listings found</h3>
            <p className="text-gray-400 mb-6">Try a different search or be the first to add a listing!</p>
            <a href="/listings/new" className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-medium text-sm transition">
              Add First Listing
            </a>
          </div>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
              {listing.imageUrl ? (
                <img src={listing.imageUrl} alt={listing.title} className="w-full h-52 object-cover group-hover:scale-105 transition-all duration-300"/>
              ) : (
                <div className="w-full h-52 bg-green-50 flex items-center justify-center">
                  <Leaf size={48} weight="light" className="text-green-300" />
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    {listing.category}
                  </span>
                  {listing.location && (
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <MapPin size={12} />
                      {listing.location}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-1">{listing.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{listing.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold">
                    {getCurrencySymbol(listing.currency)}{listing.price}
                    <span className="text-gray-400 font-normal text-sm">/{listing.pricePeriod || 'day'}</span>
                  </span>
                  <a href={`/listings/${listing.id}`} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-xs font-medium transition">
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