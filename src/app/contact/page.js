'use client'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

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
          <a href="/about" className="text-gray-600 hover:text-green-700 font-medium">About</a>
          <a href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 font-medium">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-24 px-8 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question or suggestion? We'd love to hear from you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h3>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-4 rounded-2xl text-2xl">📧</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Email Us</h4>
                  <p className="text-gray-500">support@agrishare.com</p>
                  <p className="text-gray-400 text-sm mt-1">We reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-4 rounded-2xl text-2xl">📍</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Location</h4>
                  <p className="text-gray-500">Warsaw, Poland</p>
                  <p className="text-gray-400 text-sm mt-1">MANS University, 2025/2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-4 rounded-2xl text-2xl">🕐</div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Support Hours</h4>
                  <p className="text-gray-500">Monday — Friday</p>
                  <p className="text-gray-400 text-sm mt-1">9:00 AM — 6:00 PM CET</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h3>

            {sent && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
                ✅ Your message has been sent! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Subject</label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 h-36"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
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