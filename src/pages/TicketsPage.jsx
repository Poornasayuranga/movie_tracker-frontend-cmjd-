
import { useState } from 'react'


import {
  Ticket,
  CalendarDays,
  Film,
  Clapperboard,
  X,
  Search,
  MapPin,
  Clock,
  CreditCard,
} from 'lucide-react'

import BookingSearchForm from '../components/BookingSearchForm'

export default function TicketsPage() {

  // Search form states
  const [date, setDate] = useState('')
  const [movieName, setMovieName] = useState('')
  const [showName, setShowName] = useState('')

  // Modal state
  const [showResults, setShowResults] = useState(false)

  function handleSearch() {
    setShowResults(true)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Ticket className="text-[#3B4FE8]" size={26} />
          Tickets & Pricing
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Find available movie shows and book your tickets.
        </p>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#172554] via-[#293FA8] to-[#3B4FE8] p-6 md:p-7 text-white">

        <div className="absolute -right-8 -top-12 w-52 h-52 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
              <Ticket size={15} />
              Movie Ticket Booking
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Your Next Movie Experience Starts Here
            </h2>

            <p className="text-blue-100 text-sm max-w-lg">
              Select your preferred date, movie and show to explore available tickets and pricing.
            </p>
          </div>

          <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center flex-shrink-0">
            <Ticket size={36} className="text-white" />
          </div>

        </div>
      </div>

      {/* Booking Search */}
      <div className="space-y-3">

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Find Your Bookings
          </h2>

          <p className="text-gray-500 text-sm">
            Enter your preferred booking details below.
          </p>
        </div>

        <BookingSearchForm
          date={date}
          setDate={setDate}
          movieName={movieName}
          setMovieName={setMovieName}
          showName={showName}
          setShowName={setShowName}
          onSearch={handleSearch}
        />

      </div>

      {/* Booking Results Modal */}
      {showResults && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Booking Results
                </h2>

                <p className="text-gray-500 text-xs mt-1">
                  Available tickets and pricing details
                </p>
              </div>

              <button
                onClick={() => setShowResults(false)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X size={18} />
              </button>

            </div>

            {/* Selected Booking Details */}
            <div className="p-5 space-y-4">

              <div className="bg-blue-50 rounded-xl p-4 space-y-3">

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CalendarDays size={17} className="text-[#3B4FE8]" />
                  <span>{date}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Film size={17} className="text-[#3B4FE8]" />
                  <span>{movieName}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Clapperboard size={17} className="text-[#3B4FE8]" />
                  <span>{showName}</span>
                </div>

              </div>

              {/* Future API Results */}
              <div className="text-center py-8">

                <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <Ticket size={27} className="text-[#3B4FE8]" />
                </div>

                <h3 className="font-bold text-gray-800">
                  Booking Details
                </h3>

                <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                  Available theatres, ticket prices, seat categories and booking conditions will appear here.
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  Waiting for backend API integration.
                </p>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-end">

              <button
                onClick={() => setShowResults(false)}
                className="px-5 py-2.5 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-colors"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}
