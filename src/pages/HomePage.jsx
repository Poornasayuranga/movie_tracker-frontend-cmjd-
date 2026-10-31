import { Link } from 'react-router-dom'
import {
  Film,
  Tv2,
  Theater,
  Ticket,
  Play,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  ShieldCheck,
  Clapperboard,
  Compass,
  CheckCircle2,
} from 'lucide-react'

const quickHighlights = [
  {
    title: 'Explore Movies',
    description: 'Track blockbuster releases, trending favorites, and manage your custom watchlist.',
    icon: Film,
    path: '/movies',
    badge: 'Popular',
    accentColor: '#3B4FE8',
    gradient: 'from-[#3B4FE8]/15 via-indigo-500/10 to-transparent',
  },
  {
    title: 'Browse Shows',
    description: 'Stay updated on ongoing seasons, episode releases, and binge-worthy TV series.',
    icon: Tv2,
    path: '/shows',
    badge: 'Trending',
    accentColor: '#7C3AED',
    gradient: 'from-[#7C3AED]/15 via-purple-500/10 to-transparent',
  },
  {
    title: 'Find Theatres',
    description: 'Locate top cinema halls near you with IMAX, 4DX, and Dolby Atmos screens.',
    icon: Theater,
    path: '/theatre',
    badge: 'Near You',
    accentColor: '#059669',
    gradient: 'from-[#059669]/15 via-emerald-500/10 to-transparent',
  },
  {
    title: 'Ticket & Pricing',
    description: 'Compare ticket rates across Standard, Premium, and VIP cinema experience tiers.',
    icon: Ticket,
    path: '/tickets',
    badge: 'Best Deals',
    accentColor: '#D97706',
    gradient: 'from-[#D97706]/15 via-amber-500/10 to-transparent',
  },
]

const cinemaFeatures = [
  {
    title: 'Real-Time Showtimes',
    description: 'Instant access to current schedules and upcoming cinema showtimes across all theatres.',
    icon: Clock,
  },
  {
    title: 'Seat & Venue Discovery',
    description: 'Explore premier venues offering IMAX, Dolby Cinema, 3D, and luxurious recliner seating.',
    icon: MapPin,
  },
  {
    title: 'Smart Ticket Tracker',
    description: 'Compare pricing, track ticket availability, and discover VIP deals without surprises.',
    icon: ShieldCheck,
  },
  {
    title: 'Personal Watchlists',
    description: 'Organize your movie journey, keep records of seen films, and never miss a release.',
    icon: Sparkles,
  },
]

export default function HomePage() {
  const heroBannerUrl = '/Cinematic%20Movie%20Tracker%20Hero%20Banner.png'

  return (
    <div className="space-y-10 animate-fade-in-up pb-6">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
          Uses "Cinematic Movie Tracker Hero Banner.png" as background
         ───────────────────────────────────────────────────────────── */}
      <section
        id="home-hero-section"
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        style={{
          minHeight: '480px',
          backgroundImage: `linear-gradient(135deg, rgba(8, 12, 34, 0.94) 0%, rgba(15, 23, 66, 0.88) 50%, rgba(26, 42, 150, 0.70) 100%), url('${heroBannerUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle decorative glow overlays */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 min-h-[480px]">
          {/* Top Tag / Pill */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase shadow-inner">
              <Sparkles size={14} className="text-yellow-300 animate-pulse" />
              Cinema Hub & Showtime Tracker
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Showtimes Active
            </span>
          </div>

          {/* Main Hero Typography & Call-To-Action */}
          <div className="my-auto py-8 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
              Your Next Movie <br />
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Adventure Starts Here.
              </span>
            </h1>

            <p className="mt-5 text-white/85 text-base sm:text-lg md:text-xl font-normal leading-relaxed drop-shadow-sm max-w-xl">
              Discover the latest movies, explore theatres, and find available showtimes. Everything you need for an unforgettable cinema experience, all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Explore Movies Button */}
              <Link
                to="/movies"
                id="hero-explore-movies-btn"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#3B4FE8] via-[#485ff7] to-[#7C3AED] text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-white/20"
              >
                <Film size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                <span>Explore Movies</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              {/* Browse Shows Button */}
              <Link
                to="/shows"
                id="hero-browse-shows-btn"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/25 hover:border-white/40 shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <Tv2 size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span>Browse Shows</span>
                <Play size={15} className="text-purple-300 fill-purple-300 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* Quick Hero Stat Badges */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white/90">
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">50K+</p>
              <p className="text-xs text-white/70 font-medium">Films & Series</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">100+</p>
              <p className="text-xs text-white/70 font-medium">Partner Theatres</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">4.9 ★</p>
              <p className="text-xs text-white/70 font-medium">Audience Rating</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">24/7</p>
              <p className="text-xs text-white/70 font-medium">Live Showtimes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          QUICK NAVIGATION / PILLARS
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Compass className="text-[#3B4FE8]" size={24} />
              Explore Movie Tracker
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">Quick access to essential cinema services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickHighlights.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.title}
                to={item.path}
                className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-300`} />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: `${item.accentColor}18`,
                        color: item.accentColor,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 text-base group-hover:text-[#3B4FE8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-[#3B4FE8] group-hover:gap-2 gap-1.5 transition-all">
                  <span>Open Section</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WHY CHOOSE MOVIE TRACKER / EXPERIENCE
         ───────────────────────────────────────────────────────────── */}
      <section
        className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #162480 0%, #1E3194 50%, #243BAD 100%)' }}
      >
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 size={14} className="text-purple-300" />
            The Ultimate Companion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Designed for Passionate Film & Cinema Lovers
          </h2>
          <p className="mt-2 text-white/80 text-sm sm:text-base leading-relaxed">
            From the latest Hollywood premieres to independent film circuits and theatre stages, Movie Tracker provides seamless discovery, schedules, and ticket insights in one unified dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {cinemaFeatures.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-white/15 text-purple-200 flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{feat.title}</h3>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER SECTION
          Contains exact requested texts:
          - Footer Text: Discover movies, explore theatres, and stay updated with available showtimes. Experience the magic of cinema with Movie Tracker.
          - © 2026 Movie Tracker. All Rights Reserved.
         ───────────────────────────────────────────────────────────── */}
      <footer
        id="home-footer"
        className="rounded-3xl bg-[#0B1028] text-white p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative z-10">
          {/* Col 1: Brand & Requested Footer Description */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25">
                <Clapperboard size={20} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-wide">
                movie<span className="text-purple-300">Tracker</span>
              </span>
            </div>

            {/* Requested Footer Description */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
              Discover movies, explore theatres, and stay updated with available showtimes. Experience the magic of cinema with Movie Tracker.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/70">IMAX Showtimes</span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/70">Live Seat Availability</span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/70">Personal Watchlists</span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/70">Cinema Rates</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
              <Link to="/movies" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Film size={13} className="text-blue-400" /> Movies
              </Link>
              <Link to="/shows" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Tv2 size={13} className="text-purple-400" /> Shows
              </Link>
              <Link to="/theatre" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Theater size={13} className="text-emerald-400" /> Theatres
              </Link>
              <Link to="/tickets" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Ticket size={13} className="text-amber-400" /> Tickets
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Movie Tracker. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Support Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
