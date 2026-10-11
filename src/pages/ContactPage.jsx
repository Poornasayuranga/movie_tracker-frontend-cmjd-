import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'support@movietracker.app', color: '#3B4FE8' },
  { icon: Phone, label: 'Phone', value: '+94 77 123 4567', color: '#7C3AED' },
  { icon: MapPin, label: 'Address', value: 'Colombo 03, Sri Lanka', color: '#059669' },
  { icon: Clock, label: 'Support Hours', value: 'Mon–Fri, 9am–6pm', color: '#F59E0B' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Mail className="text-[#3B4FE8]" size={26} />
          Contact Us
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">We'd love to hear from you</p>
      </div>

      {/* Contact info cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {contactInfo.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: `${color}18` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
            <p className="text-xs font-bold text-gray-700 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageSquare size={18} className="text-[#3B4FE8]" />
          <h2 className="font-bold text-gray-700">Send Us a Message</h2>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
              <Send size={28} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Message Sent!</h3>
            <p className="text-gray-500 text-sm mt-1">Thanks for reaching out. We'll get back to you shortly.</p>
          </div>
        ) : (
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                <input
                  id="contact-name"
                  required
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-[#3B4FE8]/20 transition-all placeholder:text-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-[#3B4FE8]/20 transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Subject</label>
              <input
                id="contact-subject"
                required
                placeholder="How can we help?"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-[#3B4FE8]/20 transition-all placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Message</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Write your message here..."
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-[#3B4FE8]/20 transition-all resize-none placeholder:text-gray-300"
              />
            </div>
            <button
              id="contact-submit-btn"
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3B4FE8] text-white text-sm font-bold hover:bg-[#2D3FD6] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300"
            >
              <Send size={15} />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
