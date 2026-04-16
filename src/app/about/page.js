export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌱</span>
          <a href="/" className="text-2xl font-bold text-green-700">AgriShare</a>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-gray-600 hover:text-green-700 font-medium">Home</a>
          <a href="/listings" className="text-gray-600 hover:text-green-700 font-medium">Browse</a>
          <a href="/contact" className="text-gray-600 hover:text-green-700 font-medium">Contact</a>
          <a href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 font-medium">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 py-24 px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <span className="bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block">
            🌾 Our Story
          </span>
          <h2 className="text-5xl font-bold mb-6 mt-4">About AgriShare</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to transform agriculture by connecting farmers and enabling
            them to share resources, reduce costs, and grow together through technology.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 px-8 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
          <div className="border-r border-gray-100">
            <p className="text-4xl font-bold text-green-600">4/14</p>
            <p className="text-gray-500 text-sm mt-2">Existing platforms met usability standards</p>
          </div>
          <div className="border-r border-gray-100">
            <p className="text-4xl font-bold text-blue-600">12K+</p>
            <p className="text-gray-500 text-sm mt-2">Agricultural cooperatives in France alone</p>
          </div>
          <div className="border-r border-gray-100">
            <p className="text-4xl font-bold text-yellow-600">51%</p>
            <p className="text-gray-500 text-sm mt-2">Of farm households have negative income</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">100%</p>
            <p className="text-gray-500 text-sm mt-2">Free to join AgriShare platform</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Our Mission</span>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 mt-4">Why We Built AgriShare</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              AgriShare was created to solve a real problem — agricultural resources are expensive
              and often underutilized. A tractor sits idle for months while a nearby farmer
              desperately needs one. Land goes unused while others struggle to find space to grow.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our platform bridges this gap by creating a trusted community where farmers can
              share equipment, land, labor and expertise — making agriculture more efficient,
              affordable and sustainable for everyone.
            </p>
            <a href="/listings" className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 inline-block">
              Explore Listings →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 17H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3M8 17l-3 3m3-3l3 3M17 12h4l-2 5h-9l-2-5h4V9h5v3z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Equipment</h4>
              <p className="text-gray-500 text-sm mt-2">Share and rent farming machinery</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Land</h4>
              <p className="text-gray-500 text-sm mt-2">Find or offer land for farming</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-8 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Labor</h4>
              <p className="text-gray-500 text-sm mt-2">Connect with skilled farm workers</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Advisory</h4>
              <p className="text-gray-500 text-sm mt-2">Get expert agricultural advice</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">What We Stand For</span>
          <h3 className="text-4xl font-bold text-gray-900 mb-16 mt-4 text-center">Our Core Values</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-600 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Community First</h4>
              <p className="text-gray-500 leading-relaxed">We believe in the power of farmers helping farmers. Every feature is built with the community in mind.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-blue-600 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Trust & Safety</h4>
              <p className="text-gray-500 leading-relaxed">Our rating system and verified profiles ensure every transaction is safe and transparent.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-purple-600 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Sustainability</h4>
              <p className="text-gray-500 leading-relaxed">Sharing resources reduces waste and supports a more sustainable future for agriculture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-green-700 text-white text-center">
        <h3 className="text-4xl font-bold mb-6">Join Our Growing Community</h3>
        <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
          Be part of the agricultural revolution. Share smarter, grow better.
        </p>
        <a href="/register" className="bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-green-50 shadow-lg">
          Get Started for Free
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