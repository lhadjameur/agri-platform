'use client'
import { useState, useEffect } from 'react'

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
      fetch('/api/bookings').then(r => r.json())
    ]).then(([usersData, listingsData, statsData, bookingsData]) => {
      setUsers(usersData)
      setListings(listingsData)
      setStats(statsData)
      setBookings(bookingsData)
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-500 text-lg">Loading dashboard...</p>
    </div>
  )

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'listings', icon: '📋', label: 'Listings' },
    { id: 'bookings', icon: '📅', label: 'Bookings' },
  ]

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white flex flex-col fixed h-full">
        <div className="px-6 py-8 border-b border-green-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🌱</span>
            <h1 className="text-xl font-bold">AgriShare</h1>
          </div>
          <p className="text-green-300 text-sm">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-2 px-4 py-6 flex-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition ${
                activeTab === item.id
                  ? 'bg-white text-green-800'
                  : 'text-green-100 hover:bg-green-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-green-700">
          <a href="/" className="flex items-center gap-2 text-green-300 hover:text-white text-sm">
            ← Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10">

        {/* Welcome Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, Admin! 👋</h2>
          <p className="text-gray-500 mt-1">{today}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-green-500">
            <p className="text-gray-500 text-sm mb-2">👥 Total Users</p>
            <p className="text-4xl font-bold text-green-600">{stats.users}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm mb-2">📋 Total Listings</p>
            <p className="text-4xl font-bold text-blue-600">{stats.listings}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-yellow-500">
            <p className="text-gray-500 text-sm mb-2">📅 Total Bookings</p>
            <p className="text-4xl font-bold text-yellow-600">{stats.bookings}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-purple-500">
            <p className="text-gray-500 text-sm mb-2">💬 Total Messages</p>
            <p className="text-4xl font-bold text-purple-600">{stats.messages}</p>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Users</h3>
              <div className="flex flex-col gap-4">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-600' :
                      user.role === 'vendor' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Listings</h3>
              <div className="flex flex-col gap-4">
                {listings.slice(0, 5).map(listing => (
                  <div key={listing.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium text-gray-800">{listing.title}</p>
                      <p className="text-gray-400 text-sm">{listing.category}</p>
                    </div>
                    <span className="text-green-600 font-bold">${listing.price}/day</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">All Users ({users.length})</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4">ID</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Joined</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 text-gray-400">#{user.id}</td>
                    <td className="py-4 font-medium text-gray-800">{user.name}</td>
                    <td className="py-4 text-gray-500">{user.email}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-600' :
                        user.role === 'vendor' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 text-gray-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-200"
                      >
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
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">All Listings ({listings.length})</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4">ID</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Owner</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 text-gray-400">#{listing.id}</td>
                    <td className="py-4 font-medium text-gray-800">{listing.title}</td>
                    <td className="py-4 text-gray-500">{listing.category}</td>
                    <td className="py-4 text-green-600 font-bold">${listing.price}/day</td>
                    <td className="py-4 text-gray-500">{listing.owner?.name}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        listing.available
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {listing.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => deleteListing(listing.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-200"
                      >
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
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">All Bookings ({bookings.length})</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-4">ID</th>
                  <th className="pb-4">Listing</th>
                  <th className="pb-4">User</th>
                  <th className="pb-4">Start Date</th>
                  <th className="pb-4">End Date</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400">No bookings yet</td>
                  </tr>
                )}
                {bookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 text-gray-400">#{booking.id}</td>
                    <td className="py-4 font-medium text-gray-800">{booking.listing?.title}</td>
                    <td className="py-4 text-gray-500">{booking.user?.name}</td>
                    <td className="py-4 text-gray-500">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-gray-500">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
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