'use client'
import { useState, useEffect } from 'react'
import {
  Leaf, Plus, MagnifyingGlass, ChartBar, ListBullets,
  CalendarBlank, ChatCircle, MapPin, PaperPlaneTilt,
  Info, Phone, ArrowRight, Spinner
} from '@phosphor-icons/react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [activeConversation, setActiveConversation] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const [replyMsg, setReplyMsg] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))

    Promise.all([
      fetch('/api/dashboard/listings').then(r => r.json()),
      fetch('/api/dashboard/bookings').then(r => r.json()),
      fetch('/api/messages').then(r => r.json()),
    ]).then(([listingsData, bookingsData, messagesData]) => {
      setListings(Array.isArray(listingsData) ? listingsData : [])
      setBookings(Array.isArray(bookingsData) ? bookingsData : [])
      setMessages(Array.isArray(messagesData) ? messagesData : [])
      setLoading(false)
    })
  }, [])

  const getConversations = () => {
    if (!user) return []
    const userId = Number(user.id)
    const convMap = {}
    messages.forEach(msg => {
      const otherUser = msg.senderId === userId ? msg.receiver : msg.sender
      if (!otherUser) return
      const key = `${otherUser.id}-${msg.listing?.id}`
      if (!convMap[key]) {
        convMap[key] = { key, otherUser, listing: msg.listing, messages: [], lastMessage: msg, lastDate: msg.createdAt }
      }
      convMap[key].messages.push(msg)
      if (new Date(msg.createdAt) > new Date(convMap[key].lastDate)) {
        convMap[key].lastMessage = msg
        convMap[key].lastDate = msg.createdAt
      }
    })
    return Object.values(convMap).sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate))
  }

  const handleSendReply = async () => {
    if (!replyContent.trim() || !activeConversation) return
    setSending(true)
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: replyContent,
        senderId: Number(user.id),
        receiverId: activeConversation.otherUser.id,
        listingId: activeConversation.listing?.id
      })
    })
    if (res.ok) {
      const newMsg = await res.json()
      setMessages(prev => [newMsg, ...prev])
      setReplyContent('')
      setReplyMsg('Message sent!')
      setTimeout(() => setReplyMsg(''), 3000)
    } else {
      setReplyMsg('Something went wrong.')
    }
    setSending(false)
  }

  const getCurrencySymbol = (currency) => {
    if (currency === 'EUR') return '€'
    if (currency === 'PLN') return 'zł'
    return '$'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size={40} className="text-green-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading your dashboard...</p>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', icon: <ChartBar size={18} />, label: 'Overview' },
    { id: 'listings', icon: <ListBullets size={18} />, label: 'My Listings' },
    { id: 'bookings', icon: <CalendarBlank size={18} />, label: 'My Bookings' },
    { id: 'messages', icon: <ChatCircle size={18} />, label: 'Messages' },
  ]

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const conversations = getConversations()

  const getConversationMessages = () => {
    if (!activeConversation || !user) return []
    const userId = Number(user.id)
    const listingId = activeConversation.listing?.id
    return messages.filter(msg =>
      msg.listing?.id === listingId &&
      ((msg.senderId === userId && msg.receiverId === activeConversation.otherUser.id) ||
      (msg.receiverId === userId && msg.senderId === activeConversation.otherUser.id))
    ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
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
          <a href="/listings" className="text-gray-500 hover:text-gray-900 text-sm font-medium">Browse</a>
          <a href="/profile" className="text-gray-500 hover:text-gray-900 text-sm font-medium">My Profile</a>
          <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm font-medium flex items-center gap-2 transition">
            <Plus size={16} weight="bold" />
            Add Listing
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Welcome Banner */}
        <div className="bg-green-600 text-white rounded-3xl p-10 mb-8">
          <p className="text-green-100 text-sm mb-2">{today}</p>
          <h2 className="text-3xl font-bold mb-1">Welcome back, {user?.name || 'Farmer'}</h2>
          <p className="text-green-100 mb-8 text-sm">Here is your Agrivia activity overview</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <ListBullets size={16} className="text-white" />
                <p className="text-white text-sm font-medium">My Listings</p>
              </div>
              <p className="text-4xl font-bold text-white">{listings.length}</p>
              <p className="text-green-100 text-xs mt-1">Active resources</p>
            </div>
            <div className="bg-green-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CalendarBlank size={16} className="text-white" />
                <p className="text-white text-sm font-medium">My Bookings</p>
              </div>
              <p className="text-4xl font-bold text-white">{bookings.length}</p>
              <p className="text-green-100 text-xs mt-1">Total bookings</p>
            </div>
            <div className="bg-green-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <ChatCircle size={16} className="text-white" />
                <p className="text-white text-sm font-medium">Conversations</p>
              </div>
              <p className="text-4xl font-bold text-white">{conversations.length}</p>
              <p className="text-green-100 text-xs mt-1">Active conversations</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setActiveConversation(null) }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-white text-gray-500 hover:text-gray-900 border border-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-6">

            {/* Recent Listings */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-gray-900">Recent Listings</h3>
                <button onClick={() => setActiveTab('listings')} className="text-green-600 text-sm flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={14} />
                </button>
              </div>
              {listings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf size={28} weight="light" className="text-green-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">No listings yet</p>
                  <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition">Add First Listing</a>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {listings.slice(0, 4).map(listing => (
                    <div key={listing.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                      {listing.imageUrl ? (
                        <img src={listing.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt={listing.title} />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                          <Leaf size={20} weight="light" className="text-green-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{listing.title}</p>
                        <p className="text-gray-400 text-xs">{listing.category}</p>
                      </div>
                      <span className="text-gray-900 font-semibold text-sm">
                        {getCurrencySymbol(listing.currency)}{listing.price}
                        <span className="text-gray-400 font-normal text-xs">/{listing.pricePeriod || 'day'}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-gray-900">Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} className="text-green-600 text-sm flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={14} />
                </button>
              </div>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CalendarBlank size={28} weight="light" className="text-green-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">No bookings yet</p>
                  <a href="/listings" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition">Browse Listings</a>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {bookings.slice(0, 4).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{booking.listing?.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                        'bg-yellow-50 text-yellow-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-5">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-4">
                <a href="/listings/new" className="flex flex-col items-center gap-3 p-5 bg-green-50 rounded-2xl hover:bg-green-100 transition text-center group">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Plus size={22} weight="bold" className="text-white" />
                  </div>
                  <span className="font-medium text-green-700 text-sm">Add Listing</span>
                </a>
                <a href="/listings" className="flex flex-col items-center gap-3 p-5 bg-blue-50 rounded-2xl hover:bg-blue-100 transition text-center group">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <MagnifyingGlass size={22} weight="bold" className="text-white" />
                  </div>
                  <span className="font-medium text-blue-700 text-sm">Browse Resources</span>
                </a>
                <a href="/about" className="flex flex-col items-center gap-3 p-5 bg-yellow-50 rounded-2xl hover:bg-yellow-100 transition text-center group">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Info size={22} weight="bold" className="text-white" />
                  </div>
                  <span className="font-medium text-yellow-700 text-sm">About Agrivia</span>
                </a>
                <a href="/contact" className="flex flex-col items-center gap-3 p-5 bg-purple-50 rounded-2xl hover:bg-purple-100 transition text-center group">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                    <Phone size={22} weight="bold" className="text-white" />
                  </div>
                  <span className="font-medium text-purple-700 text-sm">Contact Support</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">My Listings ({listings.length})</h3>
              <a href="/listings/new" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 flex items-center gap-2 transition">
                <Plus size={14} weight="bold" />
                Add New
              </a>
            </div>
            {listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf size={32} weight="light" className="text-green-400" />
                </div>
                <p className="text-gray-400">No listings yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {listings.map(listing => (
                  <div key={listing.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition">
                    {listing.imageUrl ? (
                      <img src={listing.imageUrl} alt={listing.title} className="w-full h-44 object-cover" />
                    ) : (
                      <div className="w-full h-44 bg-green-50 flex items-center justify-center">
                        <Leaf size={40} weight="light" className="text-green-300" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">{listing.category}</span>
                        {listing.location && (
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <MapPin size={11} /> {listing.location}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm mt-2">{listing.title}</h4>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-gray-900 font-bold text-sm">
                          {getCurrencySymbol(listing.currency)}{listing.price}
                          <span className="text-gray-400 font-normal text-xs">/{listing.pricePeriod || 'day'}</span>
                        </span>
                        <a href={`/listings/${listing.id}`} className="text-green-600 text-xs hover:underline font-medium flex items-center gap-1">
                          View Details <ArrowRight size={12} />
                        </a>
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
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6">My Bookings ({bookings.length})</h3>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarBlank size={32} weight="light" className="text-green-400" />
                </div>
                <p className="text-gray-400 mb-4">No bookings yet</p>
                <a href="/listings" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 text-sm transition">Browse Listings</a>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {bookings.map(booking => (
                  <div key={booking.id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">{booking.listing?.title}</h4>
                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                          <CalendarBlank size={14} />
                          {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                        'bg-yellow-50 text-yellow-600'
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
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex h-[600px]">

              {/* Conversations List */}
              <div className="w-80 border-r border-gray-100 flex flex-col">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Messages</h3>
                  <p className="text-gray-400 text-xs mt-1">{conversations.length} conversations</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="text-center py-12 px-6">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ChatCircle size={24} weight="light" className="text-green-400" />
                      </div>
                      <p className="text-gray-400 text-sm">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map(conv => (
                      <button
                        key={conv.key}
                        onClick={() => { setActiveConversation(conv); setReplyMsg('') }}
                        className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition ${
                          activeConversation?.key === conv.key ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                            {conv.otherUser?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold text-gray-800 text-sm truncate">{conv.otherUser?.name}</p>
                              <p className="text-gray-400 text-xs flex-shrink-0 ml-2">
                                {new Date(conv.lastDate).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-gray-400 text-xs truncate mt-0.5">Re: {conv.listing?.title}</p>
                            <p className="text-gray-500 text-xs truncate mt-0.5">{conv.lastMessage?.content}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col">
                {!activeConversation ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ChatCircle size={32} weight="light" className="text-green-400" />
                      </div>
                      <p className="text-gray-500 font-medium">Select a conversation</p>
                      <p className="text-gray-300 text-sm mt-1">Choose a conversation from the left</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                        {activeConversation.otherUser?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{activeConversation.otherUser?.name}</p>
                        <p className="text-gray-400 text-xs">Re: {activeConversation.listing?.title}</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 bg-gray-50">
                      {getConversationMessages().map(msg => {
                        const isMe = msg.senderId === Number(user.id)
                        return (
                          <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {!isMe && (
                              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs flex-shrink-0">
                                {activeConversation.otherUser?.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className={`max-w-xs lg:max-w-md flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                              {!isMe && <p className="text-xs text-gray-400 mb-1 ml-1">{activeConversation.otherUser?.name}</p>}
                              <div className={`px-4 py-2.5 rounded-2xl ${isMe ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}>
                                <p className="text-sm">{msg.content}</p>
                                <p className={`text-xs mt-1 ${isMe ? 'text-green-200' : 'text-gray-400'}`}>
                                  {new Date(msg.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            {isMe && (
                              <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {user?.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-white">
                      {replyMsg && (
                        <p className="text-sm mb-2 px-3 py-2 rounded-lg bg-green-50 text-green-700">{replyMsg}</p>
                      )}
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <input
                          type="text"
                          placeholder="Write a message..."
                          className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-sm transition"
                          value={replyContent}
                          onChange={e => setReplyContent(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                        />
                        <button
                          onClick={handleSendReply}
                          disabled={sending || !replyContent.trim()}
                          className="bg-green-600 text-white p-2.5 rounded-full hover:bg-green-700 disabled:opacity-50 transition"
                        >
                          <PaperPlaneTilt size={18} weight="fill" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}