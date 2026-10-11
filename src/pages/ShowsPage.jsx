import { Tv2, Star, Play, Plus, Clock, Zap } from 'lucide-react'

const shows = [
  {
    id: 1,
    title: 'The Bear',
    genre: 'Drama • Comedy',
    rating: 8.7,
    seasons: 3,
    episodes: 28,
    status: 'Watching',
    poster: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80',
    episode: 'S03E05',
  },
  {
    id: 2,
    title: 'Succession',
    genre: 'Drama',
    rating: 8.9,
    seasons: 4,
    episodes: 39,
    status: 'Completed',
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=300&q=80',
    episode: 'Completed',
  },
  {
    id: 3,
    title: 'The Last of Us',
    genre: 'Drama • Sci-Fi',
    rating: 8.8,
    seasons: 2,
    episodes: 17,
    status: 'Watching',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80',
    episode: 'S02E03',
  },
  {
    id: 4,
    title: 'House of Dragon',
    genre: 'Fantasy • Drama',
    rating: 8.4,
    seasons: 2,
    episodes: 18,
    status: 'Watchlist',
    poster: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=300&q=80',
    episode: 'Not Started',
  },
  {
    id: 5,
    title: 'Severance',
    genre: 'Thriller • Sci-Fi',
    rating: 8.7,
    seasons: 2,
    episodes: 19,
    status: 'Completed',
    poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80',
    episode: 'Completed',
  },
  {
    id: 6,
    title: 'The White Lotus',
    genre: 'Drama • Mystery',
    rating: 8.0,
    seasons: 3,
    episodes: 24,
    status: 'Watching',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80',
    episode: 'S03E02',
  },
]

const statusColors = {
  Watching:  { bg: '#EFF6FF', text: '#3B4FE8', dot: '#3B4FE8' },
  Completed: { bg: '#F0FDF4', text: '#16A34A', dot: '#16A34A' },
  Watchlist: { bg: '#FEF9C3', text: '#CA8A04', dot: '#CA8A04' },
}

export default function ShowsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Tv2 className="text-[#3B4FE8]" size={26} />
            TV Shows
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Your binge-watch tracker</p>
        </div>
        <button
          id="add-show-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200"
        >
          <Plus size={16} />
          Add Show
        </button>
      </div>

      {/* Currently watching highlight */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-[#3B4FE8]" />
          <h2 className="font-bold text-gray-700">Currently Watching</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {shows.filter(s => s.status === 'Watching').map(show => {
            const sc = statusColors[show.status]
            return (
              <div
                key={show.id}
                id={`show-watching-${show.id}`}
                className="flex-shrink-0 w-44 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="h-24 overflow-hidden relative">
                  <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-0.5 text-white text-[10px] font-bold">
                    {show.episode}
                  </div>
                </div>
                <div className="p-2">
                  <p className="font-bold text-gray-800 text-xs truncate">{show.title}</p>
                  <p className="text-gray-500 text-[10px]">{show.genre}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-semibold text-gray-600">{show.rating}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* All shows list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-700">All Shows</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {shows.map((show, i) => {
            const sc = statusColors[show.status]
            return (
              <div
                key={show.id}
                id={`show-row-${show.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-12 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={show.poster} alt={show.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm truncate">{show.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{show.genre}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-0.5 text-gray-500 text-xs">
                      <Clock size={11} />
                      {show.seasons}S / {show.episodes}EP
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-1"
                        style={{ background: sc.dot }}
                      />
                      {show.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">{show.rating}</span>
                </div>
                <button
                  id={`show-play-${show.id}`}
                  className="w-9 h-9 rounded-xl bg-[#3B4FE8]/10 flex items-center justify-center text-[#3B4FE8] hover:bg-[#3B4FE8] hover:text-white transition-all duration-200 flex-shrink-0"
                >
                  <Play size={15} fill="currentColor" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
