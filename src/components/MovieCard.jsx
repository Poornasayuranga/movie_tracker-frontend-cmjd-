
import { Star, Clock, Play } from 'lucide-react'
import { useState } from 'react'

export default function MovieCard({ movie, index }) {

  const [hovered, setHovered] = useState(false)

  const statusColors = {
    Watched: 'bg-emerald-100 text-emerald-700',
    Watching: 'bg-blue-100 text-blue-700',
    Watchlist: 'bg-amber-100 text-amber-700',
  }

  const status = statusColors[movie.status] || statusColors.Watchlist

  return (
    <div
      id={`movie-card-${movie.id}`}
      className="relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer shadow-md movie-card-hover transition-all duration-300 group"
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Status Badge */}
      <div className="absolute top-2 left-2">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status}`}>
          {movie.status}
        </span>
      </div>

      {/* Rating */}
      <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
        <Star size={10} className="text-yellow-400 fill-yellow-400" />

        <span className="text-white text-[11px] font-bold">
          {movie.rating}
        </span>
      </div>

      {/* Play Button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:scale-110 transition-transform duration-200">
          <Play size={18} className="text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Movie Details */}
      <div className="absolute bottom-0 left-0 right-0 p-3">

        <h3 className="text-white font-bold text-xs leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>

        <p className="text-white/60 text-[10px]">
          {movie.genre}
        </p>

        <div className="flex items-center gap-2 mt-1">

          <span className="flex items-center gap-0.5 text-white/50 text-[10px]">
            <Clock size={9} />
            {movie.duration}
          </span>

          <span className="text-white/30 text-[10px]">•</span>

          <span className="text-white/50 text-[10px]">
            {movie.year}
          </span>

        </div>

      </div>

    </div>
  )
}
