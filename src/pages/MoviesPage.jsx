import { useState } from 'react'
import { Film, Star, Clock, TrendingUp, Play, Plus, Eye, ChevronRight } from 'lucide-react'
import MovieCard from '../components/MovieCard'

const featuredMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    genre: 'Sci-Fi • Adventure',
    rating: 8.7,
    duration: '2h 46m',
    year: 2024,
    status: 'Watched',
    poster: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=300&q=80',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    genre: 'Drama • History',
    rating: 8.9,
    duration: '3h 0m',
    year: 2023,
    status: 'Watched',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&q=80',
  },
  {
    id: 3,
    title: 'Poor Things',
    genre: 'Comedy • Drama',
    rating: 8.0,
    duration: '2h 21m',
    year: 2023,
    status: 'Watchlist',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80',
  },
  {
    id: 4,
    title: 'Killers of the Flower Moon',
    genre: 'Crime • Drama',
    rating: 7.7,
    duration: '3h 26m',
    year: 2023,
    status: 'Watchlist',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&q=80',
  },
  {
    id: 5,
    title: 'The Zone of Interest',
    genre: 'Drama • War',
    rating: 7.9,
    duration: '1h 45m',
    year: 2023,
    status: 'Watching',
    poster: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&q=80',
  },
  {
    id: 6,
    title: 'Past Lives',
    genre: 'Drama • Romance',
    rating: 7.9,
    duration: '1h 46m',
    year: 2023,
    status: 'Watched',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&q=80',
  },
]

const stats = [
  { label: 'Movies Watched', value: '127', icon: Eye, color: '#3B4FE8' },
  { label: 'Hours Watched', value: '248', icon: Clock, color: '#7C3AED' },
  { label: 'Avg. Rating', value: '8.2', icon: Star, color: '#F59E0B' },
  { label: 'Watchlist', value: '34', icon: Plus, color: '#10B981' },
]

export default function MoviesPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Watched', 'Watching', 'Watchlist']

  const filtered = activeFilter === 'All'
    ? featuredMovies
    : featuredMovies.filter(m => m.status === activeFilter)

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Film className="text-[#3B4FE8]" size={26} />
            Movies
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Track and discover your favorite films</p>
        </div>
        <button
          id="add-movie-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Add Movie
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }, i) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 leading-none">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trending banner */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3B4FE8 0%, #7C3AED 100%)' }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/5" />
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <TrendingUp size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-lg">Trending This Week</p>
          <p className="text-white/70 text-sm">Dune: Part Two is the most-tracked movie right now</p>
        </div>
        <button
          id="trending-explore-btn"
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white text-sm font-semibold hover:bg-white/30 transition-all duration-200 flex-shrink-0"
        >
          Explore
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-500 font-medium mr-1">Filter:</span>
        {filters.map(f => (
          <button
            key={f}
            id={`filter-${f.toLowerCase().replace(/\s+/g, '-')}-btn`}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeFilter === f
                ? 'bg-[#3B4FE8] text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3B4FE8] hover:text-[#3B4FE8]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
        {/* Add new movie card */}
        <button
          id="add-new-movie-card-btn"
          className="aspect-[2/3] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#3B4FE8] hover:text-[#3B4FE8] hover:bg-blue-50/50 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Plus size={20} />
          </div>
          <span className="text-xs font-semibold">Add Movie</span>
        </button>
      </div>
    </div>
  )
}
