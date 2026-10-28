import { Settings, Bell, User, Save } from 'lucide-react'
import { useState } from 'react'

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile',
    icon: User,
    color: '#3B4FE8',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    color: '#7C3AED',
  },
]

export default function SettingsPage() {
  const [notifMovies, setNotifMovies] = useState(true)
  const [notifShows, setNotifShows] = useState(true)
  const [notifDeals, setNotifDeals] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Settings className="text-[#3B4FE8]" size={26} />
          Settings
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Customize your MovieTracker experience</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left nav */}
        <div className="md:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {settingsSections.map(({ id, title, icon: Icon, color }) => (
              <button
                key={id}
                id={`settings-nav-${id}`}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-left transition-all duration-150 ${
                  activeSection === id
                    ? 'bg-blue-50 text-[#3B4FE8] border-r-2 border-[#3B4FE8]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 space-y-4">
          {/* Profile section */}
          {activeSection === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Profile Information</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B4FE8] to-[#7C3AED] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-200">
                  P
                </div>
                <div>
                  <p className="font-bold text-gray-800">Poorna Sayuranga</p>
                  <p className="text-gray-500 text-sm">poorna@example.com</p>
                  <button id="change-avatar-btn" className="text-[#3B4FE8] text-xs font-semibold mt-1 hover:underline">Change Avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', id: 'input-fullname', defaultValue: 'Poorna Sayuranga' },
                  { label: 'Username', id: 'input-username', defaultValue: 'poornasayuranga' },
                  { label: 'Email', id: 'input-email', defaultValue: 'poorna@example.com' },
                  { label: 'Phone', id: 'input-phone', defaultValue: '+94 77 123 4567' },
                ].map(({ label, id, defaultValue }) => (
                  <div key={id}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
                    <input
                      id={id}
                      defaultValue={defaultValue}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-[#3B4FE8]/20 transition-all"
                    />
                  </div>
                ))}
              </div>
              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Bio</label>
                <textarea
                  id="input-bio"
                  rows={3}
                  defaultValue="Movie enthusiast and cinema lover. Always on the lookout for the next great film."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-[#3B4FE8]/20 transition-all resize-none"
                />
              </div>
              <button
                id="save-profile-btn"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-bold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200"
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Notification Preferences</h2>
              {[
                { label: 'New Movie Releases', desc: 'Get notified about new movies', state: notifMovies, set: setNotifMovies, id: 'toggle-movies' },
                { label: 'Show Updates', desc: 'New episodes and season drops', state: notifShows, set: setNotifShows, id: 'toggle-shows' },
                { label: 'Ticket Deals', desc: 'Discount alerts and offers', state: notifDeals, set: setNotifDeals, id: 'toggle-deals' },
              ].map(({ label, desc, state, set, id }) => (
                <div key={id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">{label}</p>
                    <p className="text-gray-400 text-xs">{desc}</p>
                  </div>
                  <button
                    id={id}
                    onClick={() => set(!state)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${state ? 'bg-[#3B4FE8]' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${state ? 'translate-x-6' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
