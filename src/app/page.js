export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌱</span>
          <h1 className="text-2xl font-bold text-green-700">AgriShare</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="/listings" className="text-gray-600 hover:text-green-700 font-medium">Browse</a>
          <a href="/about" className="text-gray-600 hover:text-green-700 font-medium">About</a>
          <a href="/contact" className="text-gray-600 hover:text-green-700 font-medium">Contact</a>
          <a href="/login" className="text-gray-600 hover:text-green-700 font-medium">Login</a>
          <a href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 font-medium">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
              🌾 Smarter Farming Through Sharing
            </span>
            <h2 className="text-6xl font-bold text-gray-900 mt-6 mb-6 leading-tight">
              Share & Rent <span className="text-green-600">Agricultural</span> Resources
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Connect with local farmers. Share equipment, land, labor and expertise to reduce costs and increase productivity together.
            </p>
            <div className="flex gap-4">
              <a href="/listings" className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 shadow-lg">
                Browse Listings
              </a>
              <a href="/register" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50">
                Join for Free
              </a>
            </div>
          </div>

          {/* 4 Boxes */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-bold text-gray-800 text-sm">Cut Equipment Costs</p>
                <p className="text-gray-500 text-xs mt-2">Stop buying, start sharing</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="font-bold text-gray-800 text-sm">Save Time</p>
                <p className="text-gray-500 text-xs mt-2">Find resources instantly</p>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="font-bold text-gray-800 text-sm">Grow Together</p>
                <p className="text-gray-500 text-xs mt-2">Increase productivity</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-bold text-gray-800 text-sm">Build Community</p>
                <p className="text-gray-500 text-xs mt-2">Connect with farmers</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-4">How It Works</h3>
          <p className="text-center text-gray-500 mb-16 text-lg">Get started in 3 simple steps</p>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-green-700">1</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Create Account</h4>
              <p className="text-gray-500">Sign up for free and set up your farmer profile in minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-green-700">2</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Browse or List</h4>
              <p className="text-gray-500">Find resources you need or list your own equipment and land.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-green-700">3</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Connect & Book</h4>
              <p className="text-gray-500">Message the owner, agree on terms, and confirm your booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-4">Everything You Need</h3>
          <p className="text-center text-gray-500 mb-16 text-lg">A complete platform built for farmers</p>
          <div className="grid grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-green-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-600 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3M8 17l-3 3m3-3l3 3M17 12h4l-2 5h-9l-2-5h4V9h5v3z" />
                  </svg>
                </div>
                <span className="text-gray-200 font-bold text-2xl group-hover:text-green-100 transition-all">01</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Equipment Sharing</h4>
              <p className="text-gray-500 leading-relaxed">Rent tractors, tools and machinery from nearby farmers at affordable rates.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-blue-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <span className="text-gray-200 font-bold text-2xl group-hover:text-blue-100 transition-all">02</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Land Rental</h4>
              <p className="text-gray-500 leading-relaxed">Find available land plots for seasonal farming or long term agricultural use.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-purple-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-600 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-gray-200 font-bold text-2xl group-hover:text-purple-100 transition-all">03</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Direct Messaging</h4>
              <p className="text-gray-500 leading-relaxed">Contact resource owners directly and negotiate terms easily.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-orange-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-orange-500 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-200 font-bold text-2xl group-hover:text-orange-100 transition-all">04</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Easy Booking</h4>
              <p className="text-gray-500 leading-relaxed">Book resources with a simple date picker and instant confirmation.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-yellow-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center group-hover:bg-yellow-500 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-yellow-500 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-gray-200 font-bold text-2xl group-hover:text-yellow-100 transition-all">05</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Trusted Reviews</h4>
              <p className="text-gray-500 leading-relaxed">Read verified reviews from real farmers to make informed decisions.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-red-100 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-gray-200 font-bold text-2xl group-hover:text-red-100 transition-all">06</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Secure Platform</h4>
              <p className="text-gray-500 leading-relaxed">Your data and transactions are protected with modern security standards.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-green-700 text-white text-center">
        <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
        <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
          Join thousands of farmers already using AgriShare to reduce costs and increase productivity.
        </p>
        <a href="/register" className="bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-green-50 shadow-lg">
          Create Free Account
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🌱</span>
          <span className="text-white text-xl font-bold">AgriShare</span>
        </div>
        <p className="text-sm">© 2026 AgriShare. Smarter Farming Through Sharing.</p>
      </footer>
    </main>
  )
}