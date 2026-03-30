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
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-green-600">500+</p>
                <p className="text-gray-600 mt-1">Active Farmers</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-blue-600">200+</p>
                <p className="text-gray-600 mt-1">Listings</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-yellow-600">50+</p>
                <p className="text-gray-600 mt-1">Regions</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-purple-600">98%</p>
                <p className="text-gray-600 mt-1">Satisfaction</p>
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">1</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Create Account</h4>
              <p className="text-gray-500">Sign up for free and set up your farmer profile in minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">2</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Browse or List</h4>
              <p className="text-gray-500">Find resources you need or list your own equipment and land.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">3</div>
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
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🚜</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Equipment Sharing</h4>
              <p className="text-gray-500">Rent tractors, tools and machinery from nearby farmers at affordable rates.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🌾</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Land Rental</h4>
              <p className="text-gray-500">Find available land plots for seasonal farming or long term use.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">💬</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Direct Messaging</h4>
              <p className="text-gray-500">Contact resource owners directly and negotiate terms easily.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">📅</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Easy Booking</h4>
              <p className="text-gray-500">Book resources with a simple date picker and instant confirmation.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Trusted Reviews</h4>
              <p className="text-gray-500">Read verified reviews from real farmers to make informed decisions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Secure Platform</h4>
              <p className="text-gray-500">Your data and transactions are protected with modern security.</p>
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
        <p className="text-sm">© 2026 AgriShare. Built for farmers, by farmers.</p>
      </footer>
    </main>
  )
}