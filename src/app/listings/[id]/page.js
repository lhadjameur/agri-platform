'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function ListingDetail() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [booking, setBooking] = useState({ startDate: '', endDate: '' })
  const [message, setMessage] = useState('')
  const [bookingMsg, setBookingMsg] = useState('')
  const [messageMsg, setMessageMsg] = useState('')

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then(res => res.json())
      .then(data => {
        setListing(data)
        setLoading(false)
      })
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listingId: parseInt(id),
        userId: 1,
        startDate: booking.startDate,
        endDate: booking.endDate
      })
    })
    if (res.ok) {
      setBookingMsg('✅ Booking request sent successfully!')
    } else {
      setBookingMsg('❌ Something went wrong. Please try again.')
    }
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message,
        senderId: 1,
        receiverId: listing.ownerId,
        listingId: parseInt(id)
      })
    })
    if (res.ok) {
      setMessageMsg('✅ Message sent successfully!')
      setMessage('')
    } else {
      setMessageMsg('❌ Something went wrong. Please try again.')
    }
  }

  if (loading) return <p className="p-8 text-gray-500">Loading...</p>
  if (!listing) return <p className="p-8 text-red-500">Listing not found.</p>

  const allImages = listing.images && listing.images.length > 0
    ? listing.images
    : listing.imageUrl
    ? [listing.imageUrl]
    : []

  return (
    <main className="min-h-screen bg-green-50">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-green-700">🌱 AgriShare</a>
        <a href="/listings" className="text-green-600 hover:underline">← Back to Listings</a>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12 flex flex-col gap-8">

        {/* Photo Gallery */}
        {allImages.length > 0 && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <img
              src={allImages[activeImage]}
              alt={listing.title}
              className="w-full h-96 object-cover"
            />
            {allImages.length > 1 && (
              <div className="flex gap-3 p-4">
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Photo ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                      activeImage === i ? 'border-green-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Listing Info */}
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex justify-between items-start">
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
              {listing.category}
            </span>
            {listing.location && (
              <span className="text-gray-400 text-sm">📍 {listing.location}</span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-3">{listing.title}</h2>
          <p className="text-gray-500 mb-6">{listing.description}</p>
          <div className="border-t pt-4 flex justify-between items-center">
            <p className="text-2xl font-bold text-green-700">${listing.price}/day</p>
            <div className="text-right">
              <p className="text-gray-700 font-semibold">👤 {listing.owner?.name}</p>
              <p className="text-gray-400 text-sm">{listing.owner?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">📅 Book This Resource</h3>
            {bookingMsg && (
              <p className={`p-3 rounded mb-4 ${bookingMsg.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {bookingMsg}
              </p>
            )}
            <form onSubmit={handleBooking} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Start Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={booking.startDate}
                  onChange={e => setBooking({...booking, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">End Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={booking.endDate}
                  onChange={e => setBooking({...booking, endDate: e.target.value})}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Request Booking
              </button>
            </form>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">💬 Contact Owner</h3>
            {messageMsg && (
              <p className={`p-3 rounded mb-4 ${messageMsg.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {messageMsg}
              </p>
            )}
            <form onSubmit={handleMessage} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Your Message</label>
                <textarea
                  placeholder="Ask about availability, price, or any details..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}