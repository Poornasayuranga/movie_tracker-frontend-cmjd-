import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Tv2,
  ArrowLeft,
  Calendar,
  Clock,
  Film,
  Theater,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  LogIn,
  RefreshCw,
} from 'lucide-react'

import { addShow } from '../services/showService'
import { getAllMovies } from '../services/movieService'
import { getAllTheatres } from '../services/theatreService'
import { getToken } from '../utils/tokenUtils'

export default function AddShowPage() {
  const navigate = useNavigate()

  // Form states
  const [formData, setFormData] = useState({
    movieId: '',
    theatreId: '',
    showDate: '',
    showTime: '',
    ticketPrice: '',
  })

  // Loaded database entities for easy selection
  const [availableMovies, setAvailableMovies] = useState([])
  const [availableTheatres, setAvailableTheatres] = useState([])

  // Status states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const isAuthenticated = Boolean(getToken())

  // Load available movies and theatres from backend
  useEffect(() => {
    let ignore = false

    const loadOptions = async () => {
      try {
        const [moviesRes, theatresRes] = await Promise.allSettled([
          getAllMovies(),
          getAllTheatres(),
        ])

        if (!ignore) {
          if (moviesRes.status === 'fulfilled' && Array.isArray(moviesRes.value)) {
            setAvailableMovies(moviesRes.value)
          }
          if (theatresRes.status === 'fulfilled' && Array.isArray(theatresRes.value)) {
            setAvailableTheatres(theatresRes.value)
          }
        }
      } catch (err) {
        console.warn('Failed to pre-load movies or theatres:', err)
      }
    }

    loadOptions()

    return () => {
      ignore = true
    }
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit show data to backend
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    // Basic validation
    if (
      !formData.movieId ||
      !formData.theatreId.toString().trim() ||
      !formData.showDate ||
      !formData.showTime ||
      !formData.ticketPrice
    ) {
      setError('Please fill in all required fields.')
      return
    }

    const movieId = Number(formData.movieId)
    const ticketPrice = Number(formData.ticketPrice)
    const theatreId = String(formData.theatreId).trim()

    if (!Number.isInteger(movieId) || movieId <= 0) {
      setError('Please select or enter a valid Movie ID (positive integer).')
      return
    }

    if (!theatreId) {
      setError('Please select or enter a valid Theatre ID.')
      return
    }

    if (!Number.isFinite(ticketPrice) || ticketPrice <= 0) {
      setError('Please enter a valid ticket price greater than 0.')
      return
    }

    // Prepare JSON matching backend ShowDto & entities
    const showData = {
      movieId: movieId,
      theatreId: theatreId,
      showDate: formData.showDate,
      showTime: formData.showTime,
      ticketPrice: ticketPrice,
      // Nested object representations for maximum backend compatibility
      movie: {
        id: movieId,
        ID: movieId,
      },
      theatre: {
        theatreId: theatreId,
        id: theatreId,
      },
    }

    console.log('[AddShowPage] Submitting showData to backend:', showData)
    setLoading(true)

    try {
      const response = await addShow(showData)
      console.log('[AddShowPage] Backend response:', response)

      setSuccess('Show schedule added successfully! Redirecting...')

      setTimeout(() => {
        navigate('/shows')
      }, 1200)
    } catch (err) {
      console.error('[AddShowPage] Submission error:', err)

      const backendMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response?.data : null) ||
        err.response?.data?.error ||
        err.message ||
        'Failed to add show. Please verify backend connection.'

      if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Authentication required: Please sign in to add shows to the backend.')
      } else {
        setError(backendMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/shows"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#3B4FE8] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Shows</span>
        </Link>

        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-[#7C3AED] font-semibold">
          Showtime Management
        </span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7C3AED]">
            <Tv2 size={22} />
          </div>
          Add New Show
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Schedule a new showtime, associate it with an existing movie and theatre, and configure ticket pricing.
        </p>
      </div>

      {/* Auth Warning if not signed in */}
      {!isAuthenticated && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600 flex-shrink-0" />
            <span>
              You are currently not signed in. The backend requires a valid JWT token to add shows.
            </span>
          </div>
          <Link
            to="/login"
            className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors"
          >
            <LogIn size={13} />
            <span>Sign In</span>
          </Link>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Movie Selection and Theatre Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Movie Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Film size={14} className="text-[#7C3AED]" />
                  Movie <span className="text-red-500">*</span>
                </span>
                {formData.movieId && (
                  <span className="text-[11px] font-normal text-purple-600">
                    ID: {formData.movieId}
                  </span>
                )}
              </label>

              {availableMovies.length > 0 ? (
                <select
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all bg-white"
                >
                  <option value="">Select an existing movie</option>
                  {availableMovies.map((movie) => {
                    const id = movie.id || movie.ID || movie.movieId
                    return (
                      <option key={id} value={id}>
                        {movie.title || movie.name} (ID: {id})
                      </option>
                    )
                  })}
                </select>
              ) : (
                <input
                  type="number"
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  required
                  placeholder="Enter existing Movie ID (e.g. 1)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all placeholder:text-gray-400"
                />
              )}

              <p className="text-xs text-gray-400 mt-1.5">
                Must match an existing movie in the database.
              </p>
            </div>

            {/* Theatre Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Theater size={14} className="text-[#7C3AED]" />
                  Theatre <span className="text-red-500">*</span>
                </span>
                {formData.theatreId && (
                  <span className="text-[11px] font-normal text-purple-600">
                    ID: {formData.theatreId}
                  </span>
                )}
              </label>

              {availableTheatres.length > 0 ? (
                <select
                  name="theatreId"
                  value={formData.theatreId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all bg-white"
                >
                  <option value="">Select an existing theatre</option>
                  {availableTheatres.map((theatre) => {
                    const id = theatre.theatreId || theatre.id || theatre.ID
                    return (
                      <option key={id} value={id}>
                        {theatre.theatreName || theatre.name || theatre.venue} (ID: {id})
                      </option>
                    )
                  })}
                </select>
              ) : (
                <input
                  type="text"
                  name="theatreId"
                  value={formData.theatreId}
                  onChange={handleChange}
                  required
                  placeholder="Enter Theatre ID (e.g. T01 or 1)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all placeholder:text-gray-400"
                />
              )}

              <p className="text-xs text-gray-400 mt-1.5">
                Must match an existing theatre in the database.
              </p>
            </div>
          </div>

          {/* Row 2: Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-[#7C3AED]" />
                Show Date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                name="showDate"
                value={formData.showDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-[#7C3AED]" />
                Show Time <span className="text-red-500">*</span>
              </label>

              <input
                type="time"
                name="showTime"
                value={formData.showTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
              />
            </div>
          </div>

          {/* Row 3: Ticket Price */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <DollarSign size={14} className="text-[#7C3AED]" />
              Ticket Price (LKR) <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              placeholder="e.g. 1500.00"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/shows')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold transition-all shadow-md shadow-purple-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Saving Show...</span>
                </>
              ) : (
                <>
                  <Tv2 size={16} />
                  <span>Save Show</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
