'use client'
import { 
  Leaf, 
  MagnifyingGlass, 
  TrendUp, 
  Users, 
  CurrencyDollar,
  Tractor,
  MapPin,
  ChatCircle,
  CalendarBlank,
  Star,
  ShieldCheck,
  UserCirclePlus,
  ListBullets,
  Handshake
} from '@phosphor-icons/react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Leaf size={28} weight="fill" className="text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Agrivia</h1>
        </div>
        <div className="flex items-center gap-8">
          <a href="/listings" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Browse</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900 font-medium text-sm">About</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Contact</a>
          <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Login</a>
          <a href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 font-medium text-sm transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-28 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2">
              <Leaf size={14} weight="fill" />
              Smarter Farming Through Sharing
            </span>
            <h2 className="text-6xl font-bold text-gray-900 mt-6 mb-6 leading-tight tracking-tight">
              Share & Rent <span className="text-green-600">Agricultural</span> Resources
            </h2>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Connect with local farmers. Share equipment, land, labor and expertise to reduce costs and increase productivity together.
            </p>
            <div className="flex gap-4">
              <a href="/listings" className="bg-green-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-green-700 shadow-lg transition">
                Browse Listings
              </a>
              <a href="/register" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full text-base font-semibold hover:border-gray-400 hover:bg-gray-50 transition">
                Join for Free
              </a>
            </div>
          </div>

          {/* 4 Boxes */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CurrencyDollar size={24} weight="bold" className="text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">Cut Equipment Costs</p>
                <p className="text-gray-400 text-xs mt-1">Stop buying, start sharing</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MagnifyingGlass size={24} weight="bold" className="text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">Save Time</p>
                <p className="text-gray-400 text-xs mt-1">Find resources instantly</p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendUp size={24} weight="bold" className="text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">Grow Together</p>
                <p className="text-gray-400 text-xs mt-1">Increase productivity</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users size={24} weight="bold" className="text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-sm">Build Community</p>
                <p className="text-gray-400 text-xs mt-1">Connect with farmers</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-3 tracking-tight">How It Works</h3>
          <p className="text-center text-gray-400 mb-16 text-lg">Get started in 3 simple steps</p>
          <div className="grid grid-cols-3 gap-12">

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <UserCirclePlus size={32} weight="bold" className="text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Create Account</h4>
              <p className="text-gray-400 leading-relaxed">Sign up for free and set up your farmer profile in minutes.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ListBullets size={32} weight="bold" className="text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Browse or List</h4>
              <p className="text-gray-400 leading-relaxed">Find resources you need or list your own equipment and land.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Handshake size={32} weight="bold" className="text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Connect & Book</h4>
              <p className="text-gray-400 leading-relaxed">Message the owner, agree on terms, and confirm your booking.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-3 tracking-tight">Everything You Need</h3>
          <p className="text-center text-gray-400 mb-16 text-lg">A complete platform built for farmers</p>
          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                  <Tractor size={24} weight="regular" className="text-green-600 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="text-gray-200 font-bold text-xl group-hover:text-green-100 transition-all">01</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Equipment Sharing</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Rent tractors, tools and machinery from nearby farmers at affordable rates.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <MapPin size={24} weight="regular" className="text-blue-600 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="text-gray-200 font-bold text-xl group-hover:text-blue-100 transition-all">02</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Land Rental</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Find available land plots for seasonal farming or long term agricultural use.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300">
                  <ChatCircle size={24} weight="regular" className="text-purple-600 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="text-gray-200 font-bold text-xl group-hover:text-purple-100 transition-all">03</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Direct Messaging</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Contact resource owners directly and negotiate terms easily.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                  <CalendarBlank size={24} weight="regular" className="text-orange-500 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="text-gray-200 font-bold text-xl group-hover:text-orange-100 transition-all">04</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Easy Booking</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Book resources with a simple date picker and instant confirmation.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 transition-all duration-300">
                  <Star size={24} weight="regular" className="text-yellow-500 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="text-gray-200 font-bold text-xl group-hover:text-yellow-100 transition-all">05</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Trusted Reviews</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Read verified reviews from real farmers to make informed decisions.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
                  <ShieldCheck size={24} weight="regular" className="text-red-500 group-hover:text-white transition-all duration-300" />
                </div>
                <span className="text-gray-200 font-bold text-xl group-hover:text-red-100 transition-all">06</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Secure Platform</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Your data and transactions are protected with modern security standards.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-green-600 text-white text-center">
        <h3 className="text-4xl font-bold mb-4 tracking-tight">Ready to Get Started?</h3>
        <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto">
          Join thousands of farmers already using Agrivia to reduce costs and increase productivity.
        </p>
        <a href="/register" className="bg-white text-green-700 px-10 py-4 rounded-full text-base font-bold hover:bg-green-50 shadow-lg transition">
          Create Free Account
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf size={22} weight="fill" className="text-green-500" />
          <span className="text-white text-xl font-bold">Agrivia</span>
        </div>
        <p className="text-sm">© 2026 Agrivia. Smarter Farming Through Sharing.</p>
      </footer>

    </main>
  )
}