import { Info, Film, Star, Users, Award, Heart } from 'lucide-react'

const stats = [
  { label: 'Movies Tracked', value: '50K+', icon: Film },
  { label: 'Happy Users', value: '12K+', icon: Users },
  { label: 'Avg. Rating', value: '4.9', icon: Star },
  { label: 'Awards Won', value: '8', icon: Award },
]

const team = [
  { name: 'Poorna Sayuranga', role: 'Full Stack Developer', avatar: 'PS', color: '#3B4FE8' },
  { name: 'Amara Perera', role: 'UI/UX Designer', avatar: 'AP', color: '#7C3AED' },
  { name: 'Kasun Silva', role: 'Backend Engineer', avatar: 'KS', color: '#059669' },
]

export default function AboutPage() {
  return (
    <div className="space-y-6 animate-fade-in-up max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Info className="text-[#3B4FE8]" size={26} />
          About MovieTracker
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Our story, mission, and team</p>
      </div>

      {/* Hero text */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2A3AC7 0%, #3B4FE8 50%, #7C3AED 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #fff 0%, transparent 50%)' }} />
        <Film size={40} className="text-white/30 mb-3" />
        <h2 className="text-2xl font-bold mb-3">Your Ultimate Cinema Companion</h2>
        <p className="text-white/80 leading-relaxed">
          MovieTracker was built for film enthusiasts who want to organize their movie-watching journey.
          Track what you've seen, discover what's new, and never miss a must-watch again.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <Icon size={22} className="text-[#3B4FE8] mx-auto mb-2" />
            <p className="text-2xl font-black text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Heart size={18} className="text-red-500" /> Our Mission</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          We believe everyone deserves a personal space to celebrate their love of cinema.
          MovieTracker makes it effortless to log your watchlist, discover new releases, track theatre events,
          and compare ticket prices — all in one beautiful, intuitive platform built for movie lovers.
        </p>
      </div>

      {/* Team */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-4">Meet the Team</h2>
        <div className="flex flex-wrap gap-4">
          {team.map(({ name, role, avatar, color }) => (
            <div key={name} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
              >
                {avatar}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{name}</p>
                <p className="text-gray-500 text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
