
import { Film, Plus } from 'lucide-react'

import MovieCard from '../components/MovieCard'

export default function MoviesPage() {

  // Backend data will be fetched here later
  const movies = []

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Page Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Film className="text-[#3B4FE8]" size={26} />
            Movies
          </h1>

          <p className="text-gray-500 text-sm mt-0.5">
            Track and discover your favorite films
          </p>
        </div>

        <button
          id="add-movie-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Add Movie
        </button>

      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

        {movies.length > 0 ? (

          movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
            />
          ))

        ) : (

          <p className="col-span-full text-center text-gray-500 py-10">
            No movies available.
          </p>

        )}

        {/* Add Movie Card */}
        <button
          id="add-new-movie-card-btn"
          className="aspect-[2/3] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#3B4FE8] hover:text-[#3B4FE8] hover:bg-blue-50/50 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Plus size={20} />
          </div>

          <span className="text-xs font-semibold">
            Add Movie
          </span>
        </button>

      </div>

    </div>
  )
}
