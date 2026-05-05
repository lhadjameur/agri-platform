'use client'
import { useState, useEffect } from 'react'
import {
  Leaf, User, EnvelopeSimple, Phone, MapPin,
  LockSimple, CheckCircle, ChartBar, Plus,
  MagnifyingGlass, Tractor, PencilSimple, ShieldCheck
} from '@phosphor-icons/react'

export default function Profile() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'farmer',
    location: '',
    phone: '',
    bio: ''
  })
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'farmer',
      }))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
          <a href="/dashboard" className="text-gray-500 hover:text-gray-900 font-medium text-sm">Dashboard</a>
          <a href="/listings" className="text-gray-500 hover:text-gray-900 font-medium text-sm">Browse</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-10">

        {/* Profile Header */}
        <div className="bg-green-600 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <User size={40} weight="light" className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{form.name || 'Your Name'}</h2>
              <p className="text-green-100 mt-1 text-sm">{form.email || 'your@email.com'}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs capitalize font-medium">
                  {form.role}
                </span>
                {form.location && (
                  <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <MapPin size={11} /> {form.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'profile', icon: <PencilSimple size={16} />, label: 'Edit Profile' },
            { id: 'security', icon: <ShieldCheck size={16} />, label: 'Security' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition text-sm ${
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h3 className="font-bold text-gray-900 mb-6">Personal Information</h3>

            {saved && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm">
                <CheckCircle size={18} weight="fill" />
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                    <User size={16} className="text-gray-400" />
                    <input
                      type="text"
                      className="flex-1 focus:outline-none text-sm text-gray-700"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                    <EnvelopeSimple size={16} className="text-gray-400" />
                    <input
                      type="email"
                      className="flex-1 focus:outline-none text-sm text-gray-700"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                    <Phone size={16} className="text-gray-400" />
                    <input
                      type="tel"
                      placeholder="e.g. +48 123 456 789"
                      className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Location</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                    <MapPin size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Warsaw, Poland"
                      className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                      value={form.location}
                      onChange={e => setForm({...form, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Role</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                  <Tractor size={16} className="text-gray-400" />
                  <select
                    className="flex-1 focus:outline-none text-sm text-gray-700 bg-transparent"
                    value={form.role}
                    onChange={e => setForm({...form, role: e.target.value})}
                  >
                    <option value="farmer">Farmer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Bio</label>
                <textarea
                  placeholder="Tell other farmers about yourself and your farm..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 h-28 text-sm text-gray-700 placeholder-gray-400 transition"
                  value={form.bio}
                  onChange={e => setForm({...form, bio: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition text-sm"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <h3 className="font-bold text-gray-900 mb-6">Security Settings</h3>
            <form className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Current Password</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                  <LockSimple size={16} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">New Password</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                  <LockSimple size={16} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm New Password</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                  <LockSimple size={16} className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition text-sm"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <a href="/dashboard" className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-md transition group">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-600 transition">
              <ChartBar size={22} className="text-green-600 group-hover:text-white transition" />
            </div>
            <p className="font-medium text-gray-700 text-sm">My Dashboard</p>
          </a>
          <a href="/listings/new" className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-md transition group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition">
              <Plus size={22} className="text-blue-600 group-hover:text-white transition" />
            </div>
            <p className="font-medium text-gray-700 text-sm">Add Listing</p>
          </a>
          <a href="/listings" className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-md transition group">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 transition">
              <MagnifyingGlass size={22} className="text-purple-600 group-hover:text-white transition" />
            </div>
            <p className="font-medium text-gray-700 text-sm">Browse Resources</p>
          </a>
        </div>

      </div>
    </main>
  )
}