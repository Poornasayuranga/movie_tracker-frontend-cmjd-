
import { Star, Play, Clock } from 'lucide-react'

export default function ShowCard({ show }) {
  const statusColors = {
    Watching: {
      bg: '#EFF6FF',
      text: '#3B4FE8',
      dot: '#3B4FE8',
    },
    Completed: {
      bg: '#F0FDF4',
      text: '#16A34A',
      dot: '#16A34A',
    },
    Watchlist: {
      bg: '#FEF9C3',
      text: '#CA8A04',
      dot: '#CA8A04',
    },
  }

  const status = statusColors[show.status] || statusColors.Watchlist

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer group">

      {/* Poster */}
      <div className="w-12 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
        <img
          src={show.poster}
          alt={show.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Show Details */}
      <div className="flex-1 min-w-0">

        <p className="font-bold text-gray-800 text-sm truncate">
          {show.title}
        </p>

        <p className="text-gray-500 text-xs mt-0.5">
          {show.genre}
        </p>

        <div className="flex items-center gap-3 mt-1.5">

          <span className="flex items-center gap-0.5 text-gray-500 text-xs">
            <Clock size={11} />
            {show.seasons}S / {show.episodes}EP
          </span>

          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              background: status.bg,
              color: status.text,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1"
              style={{ background: status.dot }}
            />
            {show.status}
          </span>

        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Star
          size={13}
          className="text-yellow-400 fill-yellow-400"
        />
        <span className="text-sm font-bold text-gray-700">
          {show.rating}
        </span>
      </div>

      {/* Play Button */}
      <button
        className="w-9 h-9 rounded-xl bg-[#3B4FE8]/10 flex items-center justify-center text-[#3B4FE8] hover:bg-[#3B4FE8] hover:text-white transition-all duration-200 flex-shrink-0"
      >
        <Play size={15} fill="currentColor" />
      </button>

    </div>
  )
}
