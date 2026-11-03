import { Calendar, Play } from 'lucide-react'
import { useState } from 'react'

export default function MovieCard({ movie, index }) {
  const [hovered, setHovered] = useState(false)

  const statusColors = {
    UPCOMING: 'bg-amber-100 text-amber-700',
    NOW_SHOWING: 'bg-emerald-100 text-emerald-700',
    ENDED: 'bg-blue-100 text-blue-700',
  }

  const statusLabels = {
    UPCOMING: 'Upcoming',
    NOW_SHOWING: 'Now Showing',
    ENDED: 'Ended',
  }

  const status = movie?.status
  const poster = movie?.posterUrl || movie?.poster || movie?.image

  return (
    <div
      id={`movie-card-${movie?.movieId || movie?.id || index}`}
      className="relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer shadow-md movie-card-hover transition-all duration-300 group bg-slate-800"
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster Image or Placeholder */}
      {poster ? (
        <img
          src={poster}
          alt={movie?.title || 'Movie Poster'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
          <div className="text-center px-3">
            <Play size={36} className="text-white/40 mx-auto mb-2" />
            <p className="text-white/50 text-xs">No Poster Available</p>
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Status Badge */}
      {status && (
        <div className="absolute top-2 left-2 z-10">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              statusColors[status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {statusLabels[status] || status}
          </span>
        </div>
      )}

      {/* Play Button */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center">
          <Play size={18} className="text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Movie Details */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h3 className="text-white font-bold text-xs leading-tight line-clamp-2 mb-1">
          {movie?.title || movie?.name || 'Untitled Movie'}
        </h3>

        <p className="text-white/60 text-[10px] truncate">
          {movie?.genre || movie?.category || 'Genre not specified'}
        </p>

        {movie?.releaseDate && (
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-0.5 text-white/50 text-[10px]">
              <Calendar size={9} />
              {movie.releaseDate}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
