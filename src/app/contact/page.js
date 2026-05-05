'use client'
import { useState } from 'react'
import { Leaf, EnvelopeSimple, MapPin, Clock, User, ChatCircle, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'inquiry', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', type: 'inquiry', subject: '', message: '' })
  }

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
          <a href="/about" className="text-gray-500 hover:text-gray-900 font-medium text-sm">About</a>
          <a href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 font-medium text-sm transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gray-50 py-20 px-8 text-center border-b border-gray-100">
        <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 mb-6">
          <ChatCircle size={14} />
          Get In Touch
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 mt-4 tracking-tight">Contact Us</h2>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Have a question or suggestion? We would love to hear from you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Reach Out To Us</h3>
            <div className="flex flex-col gap-6">

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-sm transition">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <EnvelopeSimple size={22} weight="regular" className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email Us</h4>
                  <p className="text-gray-500 text-sm mt-1">support@agrivia.com</p>
                  <p className="text-gray-400 text-xs mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-sm transition">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} weight="regular" className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Location</h4>
                  <p className="text-gray-500 text-sm mt-1">Warsaw, Poland</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-sm transition">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={22} weight="regular" className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Support Hours</h4>
                  <p className="text-gray-500 text-sm mt-1">Monday — Friday</p>
                  <p className="text-gray-400 text-xs mt-1">9:00 AM — 6:00 PM CET</p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h3>

            {sent && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm">
                <CheckCircle size={18} weight="fill" />
                Your message has been sent! We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Type Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Type of Message</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({...form, type: 'inquiry'})}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${
                      form.type === 'inquiry'
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-green-400'
                    }`}
                  >
                    Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({...form, type: 'complaint'})}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${
                      form.type === 'complaint'
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-red-400'
                    }`}
                  >
                    Complaint
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition bg-white">
                  <User size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition bg-white">
                  <EnvelopeSimple size={16} className="text-gray-400" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Subject</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition bg-white">
                  <ChatCircle size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="What is this about?"
                    className="flex-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 h-28 text-sm text-gray-700 placeholder-gray-400 transition bg-white"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  required
                />
              </div>

              <button
                type="submit"
                className={`text-white py-3 rounded-xl font-semibold transition text-sm flex items-center justify-center gap-2 ${
                  form.type === 'complaint' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <PaperPlaneTilt size={18} weight="fill" />
                Send {form.type === 'complaint' ? 'Complaint' : 'Message'}
              </button>

            </form>
          </div>
        </div>
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