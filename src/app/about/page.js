export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌱</span>
          <h1 className="text-2xl font-bold text-green-700">AgriShare</h1>
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
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-24 px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">About AgriShare</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We are on a mission to transform agriculture by connecting farmers and enabling 
          them to share resources, reduce costs, and grow together.
        </p>
      </section>

      {/* Mission */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              AgriShare was created to solve a real problem — agricultural resources are expensive 
              and often underutilized. A tractor sits idle for months while a nearby farmer 
              desperately needs one. Land goes unused while others struggle to find space to grow.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our platform bridges this gap by creating a trusted community where farmers can 
              share equipment, land, labor and expertise — making agriculture more efficient, 
              affordable and sustainable for everyone.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <p className="text-5xl mb-3">🚜</p>
              <h4 className="font-bold text-gray-800">Equipment</h4>
              <p className="text-gray-500 text-sm mt-2">Share and rent farming machinery</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <p className="text-5xl mb-3">🌾</p>
              <h4 className="font-bold text-gray-800">Land</h4>
              <p className="text-gray-500 text-sm mt-2">Find or offer land for farming</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-8 text-center">
              <p className="text-5xl mb-3">👨‍🌾</p>
              <h4 className="font-bold text-gray-800">Labor</h4>
              <p className="text-gray-500 text-sm mt-2">Connect with skilled farm workers</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <p className="text-5xl mb-3">💡</p>
              <h4 className="font-bold text-gray-800">Advisory</h4>
              <p className="text-gray-500 text-sm mt-2">Get expert agricultural advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Values</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <p className="text-4xl mb-4">🤝</p>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Community First</h4>
              <p className="text-gray-500">We believe in the power of farmers helping farmers. Every feature is built with the community in mind.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <p className="text-4xl mb-4">🔒</p>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Trust & Safety</h4>
              <p className="text-gray-500">Our rating system and verified profiles ensure every transaction is safe and transparent.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <p className="text-4xl mb-4">🌍</p>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Sustainability</h4>
              <p className="text-gray-500">Sharing resources reduces waste and supports a more sustainable future for agriculture.</p>
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