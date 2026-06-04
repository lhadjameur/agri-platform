'use client'
import { useState, useEffect } from 'react'
import {
  Leaf, ChartBar, Users, ListBullets, CalendarBlank,
  Trash, ArrowLeft, Spinner
} from '@phosphor-icons/react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, listings: 0, bookings: 0, messages: 0 })
  const [users, setUsers] = useState([])
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/users').then(r => r.json()),
      fetch('/api/admin/listings').then(r => r.json()),
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/bookings').then(r => r.json())
    ]).then(([usersData, listingsData, statsData, bookingsData]) => {
      setUsers(Array.isArray(usersData) ? usersData : [])
      setListings(Array.isArray(listingsData) ? listingsData : [])
      setStats(statsData && statsData.users !== undefined ? statsData : { users: 0, listings: 0, bookings: 0, messages: 0 })
      setBookings(Array.isArray(bookingsData) ? bookingsData : [])
      setLoading(false)
    }).catch(err => {
      console.error('Admin dashboard error:', err)
      setLoading(false)
    })
  }, [])

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    setUsers(users.filter(u => u.id !== id))
    setStats(s => ({ ...s, users: s.users - 1 }))
  }

  const deleteListing = async (id) => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' })
    setListings(listings.filter(l => l.id !== id))
    setStats(s => ({ ...s, listings: s.listings - 1 }))
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size={40} className="text-green-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading admin dashboard...</p>
      </div>
    </div>
  )

  const menuItems = [
    { id: 'overview', icon: <ChartBar size={18} />, label: 'Overview' },
    { id: 'users', icon: <Users size={18} />, label: 'Users' },
    { id: 'listings', icon: <ListBullets size={18} />, label: 'Listings' },
    { id: 'bookings', icon: <CalendarBlank size={18} />, label: 'Bookings' },
  ]

  const getCurrencySymbol = (currency) => {
    if (currency === 'EUR') return '€'
    if (currency === 'PLN') return 'zł'
    return '$'
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Leaf size={22} weight="fill" className="text-green-600" />
            <a href="/" className="text-lg font-bold text-gray-900">Agrivia</a>
          </div>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-medium transition ${
                activeTab === item.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-gray-100">
          <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm transition">
            <ArrowLeft size={16} />
            Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-60 flex-1 p-8">

        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, Admin</h2>
          <p className="text-gray-400 text-sm mt-1">{today}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-green-600" />
              </div>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <ListBullets size={18} className="text-blue-600" />
              </div>
              <p className="text-gray-400 text-sm">Total Listings</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.listings}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
                <CalendarBlank size={18} className="text-yellow-600" />
              </div>
              <p className="text-gray-400 text-sm">Total Bookings</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.bookings}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                <ChartBar size={18} className="text-purple-600" />
              </div>
              <p className="text-gray-400 text-sm">Total Messages</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.messages}</p>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-5">Recent Users</h3>
              <div className="flex flex-col gap-3">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{user.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{user.email}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-50 text-red-600' :
                      user.role === 'vendor' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-5">Recent Listings</h3>
              <div className="flex flex-col gap-3">
                {listings.slice(0, 5).map(listing => (
                  <div key={listing.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{listing.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{listing.category}</p>
                    </div>
                    <span className="text-gray-900 font-semibold text-sm">
                      {getCurrencySymbol(listing.currency)}{listing.price}
                      <span className="text-gray-400 font-normal text-xs">/{listing.pricePeriod || 'day'}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6">All Users ({users.length})</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-medium text-gray-400">ID</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Name</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Email</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Role</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Joined</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 text-gray-400 text-sm">#{user.id}</td>
                    <td className="py-3 font-medium text-gray-800 text-sm">{user.name}</td>
                    <td className="py-3 text-gray-500 text-sm">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-50 text-red-600' :
                        user.role === 'vendor' ? 'bg-blue-50 text-blue-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs hover:bg-red-100 transition font-medium"
                      >
                        <Trash size={13} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6">All Listings ({listings.length})</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-medium text-gray-400">ID</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Title</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Category</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Price</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Owner</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Status</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 text-gray-400 text-sm">#{listing.id}</td>
                    <td className="py-3 font-medium text-gray-800 text-sm">{listing.title}</td>
                    <td className="py-3 text-gray-500 text-sm">{listing.category}</td>
                    <td className="py-3 text-sm font-semibold text-gray-900">
                      {getCurrencySymbol(listing.currency)}{listing.price}
                      <span className="text-gray-400 font-normal text-xs">/{listing.pricePeriod || 'day'}</span>
                    </td>
                    <td className="py-3 text-gray-500 text-sm">{listing.owner?.name}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        listing.available ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {listing.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteListing(listing.id)}
                        className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs hover:bg-red-100 transition font-medium"
                      >
                        <Trash size={13} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-6">All Bookings ({bookings.length})</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-xs font-medium text-gray-400">ID</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Listing</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">User</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Start Date</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">End Date</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400 text-sm">No bookings yet</td>
                  </tr>
                )}
                {bookings.map(booking => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 text-gray-400 text-sm">#{booking.id}</td>
                    <td className="py-3 font-medium text-gray-800 text-sm">{booking.listing?.title}</td>
                    <td className="py-3 text-gray-500 text-sm">{booking.user?.name}</td>
                    <td className="py-3 text-gray-500 text-sm">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-gray-500 text-sm">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                        'bg-yellow-50 text-yellow-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}