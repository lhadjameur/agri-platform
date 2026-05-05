'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Leaf, MapPin, User, CalendarBlank, ChatCircle, Star, ArrowLeft, CheckCircle, WarningCircle, PaperPlaneTilt, Spinner, Tag } from '@phosphor-icons/react'

export default function ListingDetail() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [booking, setBooking] = useState({ startDate: '', endDate: '' })
  const [message, setMessage] = useState('')
  const [bookingMsg, setBookingMsg] = useState('')
  const [messageMsg, setMessageMsg] = useState('')
  const [reviews, setReviews] = useState([])
  const [review, setReview] = useState({ rating: 0, comment: '' })
  const [reviewMsg, setReviewMsg] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    fetch('/api/listings/' + id).then(res => res.json()).then(data => { setListing(data); setLoading(false) })
    fetch('/api/reviews?listingId=' + id).then(res => res.json()).then(data => setReviews(Array.isArray(data) ? data : []))
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!currentUser) { setBookingMsg('error:Please login to book this resource.'); return }
    const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ listingId: parseInt(id), userId: Number(currentUser.id), startDate: booking.startDate, endDate: booking.endDate }) })
    if (res.ok) { setBookingMsg('success:Booking request sent successfully!') } else { setBookingMsg('error:Something went wrong. Please try again.') }
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    if (!currentUser) { setMessageMsg('error:Please login to send a message.'); return }
    const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: message, senderId: Number(currentUser.id), receiverId: listing.ownerId, listingId: parseInt(id) }) })
    if (res.ok) { setMessageMsg('success:Message sent successfully!'); setMessage('') } else { setMessageMsg('error:Something went wrong. Please try again.') }
  }

  const handleReview = async (e) => {
    e.preventDefault()
    if (!currentUser) { setReviewMsg('error:Please login to submit a review.'); return }
    if (review.rating === 0) { setReviewMsg('error:Please select a star rating!'); return }
    const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rating: review.rating, comment: review.comment, userId: Number(currentUser.id), listingId: parseInt(id) }) })
    if (res.ok) {
      setReviewMsg('success:Review submitted successfully!')
      setReview({ rating: 0, comment: '' })
      fetch('/api/reviews?listingId=' + id).then(res => res.json()).then(data => setReviews(Array.isArray(data) ? data : []))
    } else { setReviewMsg('error:Something went wrong. Please try again.') }
  }

  const getCurrencySymbol = (currency) => {
    if (currency === 'EUR') return '€'
    if (currency === 'PLN') return 'zł'
    return '$'
  }

  const renderMsg = (msg) => {
    if (!msg) return null
    const isSuccess = msg.startsWith('success:')
    const text = msg.replace('success:', '').replace('error:', '')
    return (
      <div className={'flex items-center gap-2 p-3 rounded-xl mb-4 text-sm ' + (isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
        {isSuccess ? <CheckCircle size={16} weight="fill" /> : <WarningCircle size={16} weight="fill" />}
        {text}
      </div>
    )
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size={40} className="text-green-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading listing...</p>
      </div>
    </div>
  )

  if (!listing) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-red-500">Listing not found.</p>
    </div>
  )

  const allImages = listing.images && listing.images.length > 0 ? listing.images : listing.imageUrl ? [listing.imageUrl] : []
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : null

  const renderTags = () => {
    if (!listing.tags || listing.tags.length === 0) return null
    return (
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <Tag size={14} className="text-gray-400" />
        {listing.tags.map(function(tag) {
          return (
            <span
              key={tag}
              onClick={function() { window.location.href = '/listings?tag=' + tag }}
              className="bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer"
            >
              {'#' + tag}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">

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

      <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col gap-6">

        {allImages.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <img src={allImages[activeImage]} alt={listing.title} className="w-full h-96 object-cover" />
            {allImages.length > 1 && (
              <div className="flex gap-3 p-4">
                {allImages.map(function(img, i) {
                  return (
                    <img
                      key={i}
                      src={img}
                      alt={'Photo ' + (i + 1)}
                      onClick={function() { setActiveImage(i) }}
                      className={'w-24 h-20 object-cover rounded-xl cursor-pointer border-2 transition ' + (activeImage === i ? 'border-green-500' : 'border-transparent opacity-70')}
                    />
                  )
                })}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex justify-between items-center">
            <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">{listing.category}</span>
            {listing.location && (
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <MapPin size={14} />
                {listing.location}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-3 tracking-tight">{listing.title}</h2>
          <p className="text-gray-400 mb-4 leading-relaxed">{listing.description}</p>
          {renderTags()}
          <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {getCurrencySymbol(listing.currency)}{listing.price}
                <span className="text-gray-400 font-normal text-base">/{listing.pricePeriod || 'day'}</span>
              </p>
              {avgRating && (
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <Star size={14} weight="fill" className="text-yellow-400" />
                  {avgRating} ({reviews.length} reviews)
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-gray-800 font-semibold text-sm flex items-center gap-1 justify-end">
                <User size={14} className="text-gray-400" />
                {listing.owner?.name}
              </p>
              <p className="text-gray-400 text-xs mt-1">{listing.owner?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <CalendarBlank size={20} className="text-green-600" />
              <h3 className="font-bold text-gray-900">Book This Resource</h3>
            </div>
            {renderMsg(bookingMsg)}
            {!currentUser ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-4">Please login to book this resource</p>
                <a href="/login" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 text-sm transition">Login</a>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Start Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-sm transition" value={booking.startDate} onChange={e => setBooking({...booking, startDate: e.target.value})} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">End Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-sm transition" value={booking.endDate} onChange={e => setBooking({...booking, endDate: e.target.value})} required />
                </div>
                <button type="submit" className="bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition text-sm">Request Booking</button>
              </form>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <ChatCircle size={20} className="text-blue-600" />
              <h3 className="font-bold text-gray-900">Contact Owner</h3>
            </div>
            {renderMsg(messageMsg)}
            {!currentUser ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm mb-4">Please login to contact the owner</p>
                <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 text-sm transition">Login</a>
              </div>
            ) : (
              <form onSubmit={handleMessage} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Your Message</label>
                  <textarea placeholder="Ask about availability, price, or any details..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 h-32 text-sm placeholder-gray-400 transition" value={message} onChange={e => setMessage(e.target.value)} required />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition text-sm flex items-center justify-center gap-2">
                  <PaperPlaneTilt size={16} weight="fill" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Star size={20} className="text-yellow-500" weight="fill" />
            <h3 className="font-bold text-gray-900">Reviews & Ratings</h3>
            {avgRating && <span className="ml-auto text-sm text-gray-500">{avgRating} avg · {reviews.length} reviews</span>}
          </div>

          {!currentUser ? (
            <div className="text-center py-6 bg-gray-50 rounded-2xl mb-6">
              <p className="text-gray-400 text-sm mb-4">Please login to write a review</p>
              <a href="/login" className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 text-sm transition">Login</a>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h4 className="font-bold text-gray-800 mb-4 text-sm">Write a Review</h4>
              {renderMsg(reviewMsg)}
              <form onSubmit={handleReview} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setReview({...review, rating: star})} className="transition hover:scale-110 focus:outline-none">
                        <Star size={28} weight={star <= review.rating ? 'fill' : 'regular'} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{review.rating > 0 ? 'You selected ' + review.rating + ' star' + (review.rating > 1 ? 's' : '') : 'Click to select a rating'}</p>
                </div>
                <textarea placeholder="Share your experience with this resource..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 h-24 text-sm placeholder-gray-400 transition" value={review.comment} onChange={e => setReview({...review, comment: e.target.value})} required />
                <button type="submit" className="bg-yellow-500 text-white py-2.5 px-6 rounded-xl font-medium hover:bg-yellow-600 transition text-sm self-start">Submit Review</button>
              </form>
            </div>
          )}

          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <Star size={32} weight="light" className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map(r => (
                <div key={r.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{r.user?.name}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={14} weight={star <= r.rating ? 'fill' : 'regular'} className={star <= r.rating ? 'text-yellow-400' : 'text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-gray-500 text-sm">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}