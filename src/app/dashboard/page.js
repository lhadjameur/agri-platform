'use client'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [replyTo, setReplyTo] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const [replyMsg, setReplyMsg] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    Promise.all([
      fetch('/api/dashboard/listings').then(r => r.json()),
      fetch('/api/dashboard/bookings').then(r => r.json()),
      fetch('/api/messages?userId=1').then(r => r.json()),
    ]).then(([listingsData, bookingsData, messagesData]) => {
      setListings(Array.isArray(listingsData) ? listingsData : [])
      setBookings(Array.isArray(bookingsData) ? bookingsData : [])
      setMessages(Array.isArray(messagesData) ? messagesData : [])
      setLoading(false)
    })
  }, [])

  const handleReply = async (msg) => {
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: replyContent,
        senderId: 1,
        receiverId: msg.senderId === 1 ? msg.receiverId : msg.senderId,
        listingId: msg.listingId
      })
    })
    if (res.ok) {
      setReplyMsg('✅ Reply sent!')
      setReplyContent('')
      setReplyTo(null)
    } else {
      setReplyMsg('❌ Something went wrong.')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-5xl mb-4">🌱</p>
        <p className="text-gray-500 text-lg">Loading your dashboard...</p>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'listings', icon: '📋', label: 'My Listings' },
    { id: 'bookings', icon: '📅', label: 'My Bookings' },
    { id: 'messages', icon: '💬', label: 'Messages' },
  ]

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold text-green-700">AgriShare</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/listings" className="text-gray-600 hover:text-green-700 text-sm font-medium">Browse</a>
          <a href="/profile" className="text-gray-600 hover:text-green-700 text-sm font-medium">My Profile</a>
          <a href="/listings/new" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 text-sm font-medium">
            + Add Listing
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Hero Welcome Banner */}
        <div className="relative bg-gradient-to-r from-green-700 to-green-500 text-white rounded-3xl p-10 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-10 select-none">🌾</div>
          <div className="absolute bottom-0 left-64 text-7xl opacity-10 select-none">🚜</div>
          <p className="text-green-200 text-sm mb-2">{today}</p>
          <h2 className="text-4xl font-bold mb-1">Welcome back, {user?.name || 'Farmer'}! 👋</h2>
          <p className="text-green-100 mb-8">Here is your AgriShare activity overview</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-800 rounded-2xl p-5">
              <p className="text-green-300 text-sm mb-1">📋 My Listings</p>
              <p className="text-4xl font-bold text-white">{listings.length}</p>
              <p className="text-green-300 text-xs mt-1">Active resources</p>
            </div>
            <div className="bg-green-800 rounded-2xl p-5">
              <p className="text-green-300 text-sm mb-1">📅 My Bookings</p>
              <p className="text-4xl font-bold text-white">{bookings.length}</p>
              <p className="text-green-300 text-xs mt-1">Total bookings</p>
            </div>
            <div className="bg-green-800 rounded-2xl p-5">
              <p className="text-green-300 text-sm mb-1">💬 Messages</p>
              <p className="text-4xl font-bold text-white">{messages.length}</p>
              <p className="text-green-300 text-xs mt-1">Conversations</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-green-50 shadow-sm'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Listings</h3>
                <button onClick={() => setActiveTab('listings')} className="text-green-600 text-sm hover:underline">View all →</button>
              </div>
              {listings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-4xl mb-3">🌾</p>
                  <p className="text-gray-400 mb-4">No listings yet</p>
                  <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">Add First Listing</a>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {listings.slice(0, 4).map(listing => (
                    <div key={listing.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                      {listing.imageUrl ? (
                        <img src={listing.imageUrl} className="w-14 h-14 rounded-xl object-cover" alt={listing.title}/>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl">🌾</div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{listing.title}</p>
                        <p className="text-gray-400 text-sm">{listing.category}</p>
                      </div>
                      <span className="text-green-600 font-bold">${listing.price}/day</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} className="text-green-600 text-sm hover:underline">View all →</button>
              </div>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-4xl mb-3">📅</p>
                  <p className="text-gray-400 mb-4">No bookings yet</p>
                  <a href="/listings" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">Browse Listings</a>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {bookings.slice(0, 4).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                      <div>
                        <p className="font-medium text-gray-800">{booking.listing?.title}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="col-span-2 bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-4">
                <a href="/listings/new" className="flex flex-col items-center gap-3 p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition text-center">
                  <span className="text-4xl">➕</span>
                  <span className="font-medium text-green-700">Add Listing</span>
                </a>
                <a href="/listings" className="flex flex-col items-center gap-3 p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition text-center">
                  <span className="text-4xl">🔍</span>
                  <span className="font-medium text-blue-700">Browse Resources</span>
                </a>
                <a href="/about" className="flex flex-col items-center gap-3 p-6 bg-yellow-50 rounded-2xl hover:bg-yellow-100 transition text-center">
                  <span className="text-4xl">ℹ️</span>
                  <span className="font-medium text-yellow-700">About AgriShare</span>
                </a>
                <a href="/contact" className="flex flex-col items-center gap-3 p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition text-center">
                  <span className="text-4xl">📞</span>
                  <span className="font-medium text-purple-700">Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">My Listings ({listings.length})</h3>
              <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">+ Add New</a>
            </div>
            {listings.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No listings yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {listings.map(listing => (
                  <div key={listing.id} className="border rounded-2xl overflow-hidden hover:shadow-md transition">
                    {listing.imageUrl ? (
                      <img src={listing.imageUrl} alt={listing.title} className="w-full h-48 object-cover"/>
                    ) : (
                      <div className="w-full h-48 bg-green-50 flex items-center justify-center text-5xl">🌾</div>
                    )}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{listing.category}</span>
                        {listing.location && <span className="text-gray-400 text-xs">📍 {listing.location}</span>}
                      </div>
                      <h4 className="font-bold text-gray-800 mt-2">{listing.title}</h4>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-green-600 font-bold">${listing.price}/day</span>
                        <a href={`/listings/${listing.id}`} className="text-green-600 text-sm hover:underline font-medium">View Details →</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">My Bookings ({bookings.length})</h3>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">📅</p>
                <p className="text-gray-400 mb-4">No bookings yet</p>
                <a href="/listings" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Browse Listings</a>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="border rounded-2xl p-6 hover:shadow-sm transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{booking.listing?.title}</h4>
                        <p className="text-gray-500 mt-1">
                          📅 {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Messages ({messages.length})</h3>
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">💬</p>
                <p className="text-gray-400">No messages yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map(msg => (
                  <div key={msg.id} className="border rounded-2xl p-6 hover:shadow-sm transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-gray-800">
                          {msg.senderId === 1 ? `✉️ To: ${msg.receiver?.name}` : `📩 From: ${msg.sender?.name}`}
                        </p>
                        <p className="text-gray-400 text-sm">Re: {msg.listing?.title}</p>
                      </div>
                      <p className="text-gray-400 text-sm">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-gray-600 bg-gray-50 rounded-xl p-4 mb-4">{msg.content}</p>
                    {replyTo === msg.id ? (
                      <div className="mt-3">
                        {replyMsg && (
                          <p className={`p-2 rounded mb-2 text-sm ${replyMsg.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                            {replyMsg}
                          </p>
                        )}
                        <textarea
                          placeholder="Write your reply..."
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 h-24 mb-3"
                          value={replyContent}
                          onChange={e => setReplyContent(e.target.value)}
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReply(msg)}
                            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-green-700 font-medium"
                          >
                            Send Reply
                          </button>
                          <button
                            onClick={() => { setReplyTo(null); setReplyContent(''); setReplyMsg('') }}
                            className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg text-sm hover:bg-gray-200 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setReplyTo(msg.id); setReplyMsg('') }}
                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-100 font-medium"
                      >
                        ↩️ Reply
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}