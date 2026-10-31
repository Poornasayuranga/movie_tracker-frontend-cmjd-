
import { CalendarDays, Film, Clapperboard, Search } from 'lucide-react'

export default function BookingSearchForm({
  date,
  setDate,
  movieName,
  setMovieName,
  showName,
  setShowName,
  onSearch,
}) {

  function handleSubmit(e) {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

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

        {/* Movie Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Film size={17} className="text-[#3B4FE8]" />
            Movie Name
          </label>

          <input
            type="text"
            placeholder="Enter movie name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Show Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Clapperboard size={17} className="text-[#3B4FE8]" />
            Show Name
          </label>

          <input
            type="text"
            placeholder="Enter show name or time"
            value={showName}
            onChange={(e) => setShowName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-blue-100"
          />
        </div>

      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-end">

        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#3B4FE8] text-white text-sm font-bold hover:bg-[#2D3FD6] transition-all duration-200 shadow-md shadow-blue-200"
        >
          <Search size={17} />
          Search Bookings
        </button>

      </div>

    </form>
  )
}
