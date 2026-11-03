import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Film, Plus, RefreshCw } from 'lucide-react'

import MovieCard from '../components/MovieCard'
import { getAllMovies } from '../services/movieService'

export default function MoviesPage() {
  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch movies from backend
  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getAllMovies()
      setMovies(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch movies:', err)
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to load movies. Please check backend connection.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Load movies on mount
  useEffect(() => {
    let ignore = false

    const loadInitial = async () => {
      try {
        setError('')
        const data = await getAllMovies()
        if (!ignore) {
          setMovies(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to fetch movies:', err)
          setError(
            err.response?.data?.message ||
            err.message ||
            'Failed to load movies. Please check backend connection.'
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadInitial()

    return () => {
      ignore = true
    }
  }, [])

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
          onClick={() => navigate('/movies/add')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus size={16} />
          Add Movie
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Loading State */}
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-[#3B4FE8] rounded-full animate-spin mb-3"></div>
            <p>Loading movies...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="col-span-full flex flex-col items-center justify-center py-10 gap-3">
            <p className="text-red-500 text-center">
              {error}
            </p>

            <button
              onClick={fetchMovies}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3B4FE8] text-white text-sm hover:bg-[#2D3FD6] cursor-pointer"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        ) : movies.length > 0 ? (
          /* Display Movies */
          movies.map((movie, index) => (
            <MovieCard
              key={movie.movieId || movie.id || movie.ID || index}
              movie={movie}
              index={index}
            />
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full text-center py-10">
            <Film size={40} className="mx-auto text-gray-300 mb-3" />

            <p className="text-gray-500">
              No movies available.
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Add your first movie to get started.
            </p>
          </div>
        )}

        {/* Add Movie Card */}
        {!loading && !error && (
          <button
            id="add-new-movie-card-btn"
            onClick={() => navigate('/movies/add')}
            className="aspect-[2/3] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#3B4FE8] hover:text-[#3B4FE8] hover:bg-blue-50/50 transition-all duration-200 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Plus size={20} />
            </div>

            <span className="text-xs font-semibold">
              Add Movie
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
