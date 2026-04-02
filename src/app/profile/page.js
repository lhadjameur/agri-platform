'use client'
import { useState } from 'react'

export default function Profile() {
  const [form, setForm] = useState({
    name: 'Test Farmer',
    email: 'test@agri.com',
    role: 'farmer',
    location: 'Warsaw, Poland',
    phone: '',
    bio: ''
  })
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold text-green-700">AgriShare</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="text-gray-600 hover:text-green-700 font-medium text-sm">Dashboard</a>
          <a href="/listings" className="text-gray-600 hover:text-green-700 font-medium text-sm">Browse</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-10">

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-lg">
              👨‍🌾
            </div>
            <div>
              <h2 className="text-3xl font-bold">{form.name}</h2>
              <p className="text-green-100 mt-1">{form.email}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-green-900 text-green-200 px-4 py-1 rounded-full text-sm capitalize font-medium">
                  {form.role}
                </span>
                {form.location && (
                  <span className="bg-green-900 text-green-200 px-4 py-1 rounded-full text-sm font-medium">
                    📍 {form.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { id: 'profile', label: '👤 Edit Profile' },
            { id: 'security', label: '🔒 Security' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-green-50 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>

            {saved && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
                ✅ Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block font-medium">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +48 123 456 789"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block font-medium">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Warsaw, Poland"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Role</label>
                <select
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                >
                  <option value="farmer">Farmer</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Bio</label>
                <textarea
                  placeholder="Tell other farmers about yourself and your farm..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
                  value={form.bio}
                  onChange={e => setForm({...form, bio: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 text-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h3>
            <form className="flex flex-col gap-5">
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block font-medium">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 text-lg"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <a href="/dashboard" className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-3xl mb-2">📊</p>
            <p className="font-medium text-gray-700">My Dashboard</p>
          </a>
          <a href="/listings/new" className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-3xl mb-2">➕</p>
            <p className="font-medium text-gray-700">Add Listing</p>
          </a>
          <a href="/listings" className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-3xl mb-2">🔍</p>
            <p className="font-medium text-gray-700">Browse Resources</p>
          </a>
        </div>
      </div>
    </main>
  )
}