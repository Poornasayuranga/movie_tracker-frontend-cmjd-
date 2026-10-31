import { useState } from 'react'
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom'
import {
  Film,
  Tv2,
  Theater,
  Ticket,
  Settings,
  Home,
  Info,
  Mail,
  LogOut,
  Bell,
  Search,
  Clapperboard,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

const sidebarItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Movies', icon: Film, path: '/movies' },
  { label: 'Shows', icon: Tv2, path: '/shows' },
  { label: 'Theatre', icon: Theater, path: '/theatre' },
  { label: 'Ticket & Price', icon: Ticket, path: '/tickets' },
]

const navLinks = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'About', icon: Info, path: '/about' },
  { label: 'Contact Us', icon: Mail, path: '/contact' },
]

export default function Layout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications] = useState(3)

  return (
    <div className="flex flex-col h-screen bg-[#0F0F1A] overflow-hidden">
      {/* ── TOP NAVBAR ── */}
      <header
        className="flex items-center justify-between px-4 md:px-6 py-0 h-[64px] flex-shrink-0 relative z-50"
        style={{ background: 'linear-gradient(135deg, #0F1D5C 0%, #162480 50%, #1A2A96 100%)' }}
      >
        {/* Left: Logo + hamburger */}
        <div className="flex items-center gap-3">
          <button
            id="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 md:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-2 group no-underline">
            <div className="relative animate-float">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25 group-hover:bg-white/25 transition-all duration-300">
                <Clapperboard size={20} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-400 border-2 border-[#3B4FE8] animate-pulse" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wide leading-none block">
                movie<span className="text-purple-300">Tracker</span>
              </span>
              <span className="text-white/50 text-[10px] tracking-widest uppercase leading-none">
                Cinema Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Search + Bell + Logout */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-48' : 'w-9'}`}>
            {searchOpen ? (
              <input
                autoFocus
                type="text"
                id="navbar-search-input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onBlur={() => { setSearchQuery(''); setSearchOpen(false); }}
                placeholder="Search movies..."
                className="w-full bg-white/15 border border-white/30 rounded-xl px-3 py-1.5 text-white text-sm placeholder-white/50 outline-none focus:bg-white/20 transition-all"
              />
            ) : (
              <button
                id="navbar-search-btn"
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button
            id="navbar-notifications-btn"
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border border-[#3B4FE8]">
                {notifications}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            id="navbar-logout-btn"
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white text-sm font-semibold hover:bg-red-500/80 hover:border-red-400 transition-all duration-300 group"
          >
            <LogOut size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ── BODY: SIDEBAR + CONTENT ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`
            flex-shrink-0 flex flex-col h-full transition-all duration-300 ease-in-out z-40
            ${sidebarOpen ? 'w-56' : 'w-0 md:w-16'}
            absolute md:relative overflow-hidden
          `}
          style={{ background: 'linear-gradient(180deg, #1A2878 0%, #1E3194 60%, #243BAD 100%)' }}
        >
          <div className="flex flex-col h-full p-3 min-w-[56px]">
            {/* Nav items */}
            <div className="flex-1 flex flex-col gap-2 mt-2">
              {sidebarItems.map(({ label, icon: Icon, path }, idx) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  id={`sidebar-${label.toLowerCase().replace(/\s+/g, '-')}-btn`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className={({ isActive }) =>
                    `animate-fade-in-left group flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-250 ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg shadow-blue-900/50 border border-white/20'
                        : 'text-white/65 hover:text-white hover:bg-white/12 border border-transparent hover:border-white/15'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          isActive
                            ? 'bg-white/25 shadow-md'
                            : 'bg-white/10 group-hover:bg-white/18'
                        }`}
                      >
                        <Icon size={17} />
                      </div>
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 truncate">{label}</span>
                          {isActive && <ChevronRight size={14} className="flex-shrink-0 opacity-70" />}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/15 my-3" />

            {/* Settings */}
            <NavLink
              to="/settings"
              id="sidebar-settings-btn"
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-250 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg border border-white/20'
                    : 'text-white/65 hover:text-white hover:bg-white/12 border border-transparent hover:border-white/15'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isActive ? 'bg-white/25 shadow-md' : 'bg-white/10 group-hover:bg-white/18'
                    }`}
                  >
                    <Settings size={17} className={isActive ? '' : 'group-hover:rotate-45 transition-transform duration-300'} />
                  </div>
                  {sidebarOpen && <span className="flex-1 truncate">Settings</span>}
                </>
              )}
            </NavLink>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden absolute inset-0 bg-black/40 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6" style={{ background: '#EEF0FB' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
