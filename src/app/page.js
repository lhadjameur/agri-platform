export default function Home() {
  return (
    <main className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">🌱 AgriShare</h1>
        <div className="flex gap-4">
          <a href="/listings" className="text-green-700 hover:underline">Listings</a>
          <a href="/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Login</a>
          <a href="/register" className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50">Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-4">
        <h2 className="text-5xl font-bold text-green-800 mb-6">
          Share & Rent Agricultural Resources
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Connect with farmers in your area. Share equipment, land, and expertise to reduce costs and increase productivity.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/listings" className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700">
            Browse Listings
          </a>
          <a href="/register" className="border border-green-600 text-green-600 px-8 py-3 rounded-lg text-lg hover:bg-green-50">
            Get Started
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-3 gap-8 px-16 py-16">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-4xl mb-4">🚜</div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Equipment Sharing</h3>
          <p className="text-gray-500">Rent tractors, tools and machinery from nearby farmers at affordable rates.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-4xl mb-4">🌾</div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Land Rental</h3>
          <p className="text-gray-500">Find available land plots for seasonal farming or long term agricultural use.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-green-700 mb-2">Trusted Reviews</h3>
          <p className="text-gray-500">Read verified reviews from real farmers to make informed decisions.</p>
        </div>
      </section>
    </main>
  )
}