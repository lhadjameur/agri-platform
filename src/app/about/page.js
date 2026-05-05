'use client'
import { Leaf, Tractor, MapPin, Users, Lightbulb, ShieldCheck } from '@phosphor-icons/react'
export default function About() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Leaf size={26} weight="fill" className="text-green-600" />
          <a href="/" className="text-xl font-bold text-gray-900">Agrivia</a>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-gray-500 hover:text-gray-900 font-medium text-sm">Home</a>
          <a href="/listings" className="text-gray-500 hover:text-gray-900 font-medium text-sm">Browse</a>
          <a href="/contact" className="text-gray-500 hover:text-gray-900 font-medium text-sm">Contact</a>
          <a href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 font-medium text-sm transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-green-600 py-24 px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <span className="bg-green-700 text-green-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-flex items-center gap-2">
            <Leaf size={14} weight="fill" />
            Our Story
          </span>
          <h2 className="text-5xl font-bold mb-6 mt-4 tracking-tight">About Agrivia</h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
            We are on a mission to transform agriculture by connecting farmers and enabling
            them to share resources, reduce costs, and grow together through technology.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
          <div className="border-r border-gray-100">
            <p className="text-4xl font-bold text-green-600">4/14</p>
            <p className="text-gray-400 text-sm mt-2">Existing platforms met usability standards</p>
          </div>
          <div className="border-r border-gray-100">
            <p className="text-4xl font-bold text-blue-600">12K+</p>
            <p className="text-gray-400 text-sm mt-2">Agricultural cooperatives in France alone</p>
          </div>
          <div className="border-r border-gray-100">
            <p className="text-4xl font-bold text-yellow-600">51%</p>
            <p className="text-gray-400 text-sm mt-2">Of farm households have negative income</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">100%</p>
            <p className="text-gray-400 text-sm mt-2">Free to join Agrivia platform</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Our Mission</span>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 mt-4 tracking-tight">Why We Built Agrivia</h3>
            <p className="text-gray-500 leading-relaxed mb-4">
              Agrivia was created to solve a real problem — agricultural resources are expensive
              and often underutilized. A tractor sits idle for months while a nearby farmer
              desperately needs one. Land goes unused while others struggle to find space to grow.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our platform bridges this gap by creating a trusted community where farmers can
              share equipment, land, labor and expertise — making agriculture more efficient,
              affordable and sustainable for everyone.
            </p>
            <a href="/listings" className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 inline-flex items-center gap-2 text-sm transition">
              Explore Listings
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Tractor size={22} weight="regular" className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Equipment</h4>
              <p className="text-gray-400 text-xs mt-1">Share and rent farming machinery</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={22} weight="regular" className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Land</h4>
              <p className="text-gray-400 text-xs mt-1">Find or offer land for farming</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={22} weight="regular" className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Labor</h4>
              <p className="text-gray-400 text-xs mt-1">Connect with skilled farm workers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition border border-gray-100">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb size={22} weight="regular" className="text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Advisory</h4>
              <p className="text-gray-400 text-xs mt-1">Get expert agricultural advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">What We Stand For</span>
            <h3 className="text-3xl font-bold text-gray-900 mt-4 tracking-tight">Our Core Values</h3>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all duration-300">
                <Users size={22} weight="regular" className="text-green-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Community First</h4>
              <p className="text-gray-400 text-sm leading-relaxed">We believe in the power of farmers helping farmers. Every feature is built with the community in mind.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-300">
                <ShieldCheck size={22} weight="regular" className="text-blue-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Trust & Safety</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Our rating system and verified profiles ensure every transaction is safe and transparent.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all duration-300">
                <Leaf size={22} weight="regular" className="text-purple-600 group-hover:text-white transition-all duration-300" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-3">Sustainability</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Sharing resources reduces waste and supports a more sustainable future for agriculture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-green-600 text-white text-center">
        <h3 className="text-4xl font-bold mb-4 tracking-tight">Join Our Growing Community</h3>
        <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto">
          Be part of the agricultural revolution. Share smarter, grow better.
        </p>
        <a href="/register" className="bg-white text-green-700 px-10 py-4 rounded-full text-base font-bold hover:bg-green-50 shadow-lg transition">
          Get Started for Free
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