
import { CalendarDays, Clapperboard, Search } from 'lucide-react'

export default function BookingSearchForm({
  date,
  setDate,
  showId,
  setShowId,
  shows,
  onSearch,
  loading,
}) {

  function handleSubmit(e) {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Booking Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <CalendarDays size={17} className="text-[#3B4FE8]" />
            Booking Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Clapperboard size={17} className="text-[#3B4FE8]" />
            Show
          </label>

          <select
            value={showId}
            onChange={(e) => setShowId(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-blue-100"
            disabled={loading || shows.length === 0}
          >
            <option value="">
              {loading ? 'Loading shows...' : shows.length ? 'Select a show' : 'No shows available'}
            </option>
            {shows.map((show, index) => {
              const id = show.showId ?? show.id ?? show.ID ?? index
              const movieName = show.movie?.movieName || show.movie?.title || show.movieName || show.title || show.name
              const showDate = show.showDate || show.date
              const showTime = show.showTime || show.time
              const theatreName = show.theatre?.theatreName || show.theatre?.name
              const label = [movieName, showDate, showTime, theatreName].filter(Boolean).join(' · ')

              return (
                <option key={id} value={id}>
                  {label || `Show ${id}`}
                </option>
              )
            })}
          </select>
        </div>

      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-end">

        <button
          type="submit"
          disabled={loading || shows.length === 0}
          className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#3B4FE8] text-white text-sm font-bold hover:bg-[#2D3FD6] transition-all duration-200 shadow-md shadow-blue-200 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
        >
          <Search size={17} />
          Search Bookings
        </button>

      </div>

    </form>
  )
}
