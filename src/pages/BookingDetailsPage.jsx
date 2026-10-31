
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  ArrowLeft,
  Ticket,
  CalendarDays,
  Film,
  MapPin,
  Clock,
  Armchair,
  CreditCard,
  CheckCircle,
  Monitor,
} from 'lucide-react'

export default function BookingDetailsPage() {

  const navigate = useNavigate()
  const location = useLocation()

  // Details received from previous page
  const booking = location.state || {}

  const [theatre, setTheatre] = useState('')
  const [showTime, setShowTime] = useState('')
  const [seatType, setSeatType] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])

  // Temporary data - replace with backend API data
  const theatres = []
  const showTimes = []
  const availableSeats = []

  // Backend calculated price
  const finalPrice = null

  function handleSeatSelect(seatNumber) {

    setSelectedSeats((previousSeats) =>
      previousSeats.includes(seatNumber)
        ? previousSeats.filter(seat => seat !== seatNumber)
        : [...previousSeats, seatNumber]
    )

  }

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Back Button */}
      <button
        onClick={() => navigate('/tickets')}
        className="flex items-center gap-2 text-gray-600 hover:text-[#3B4FE8] font-semibold text-sm transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Tickets
      </button>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Ticket size={26} className="text-[#3B4FE8]" />
          Complete Your Booking
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Select your theatre, showtime and preferred seats.
        </p>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#172554] via-[#293FA8] to-[#3B4FE8] p-6 text-white">

        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">

          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">
            <Ticket size={15} />
            Ticket Reservation
          </div>

          <h2 className="text-xl font-bold">
            Your Movie, Your Seats, Your Experience
          </h2>

          <p className="text-blue-100 text-sm mt-2 max-w-lg">
            Choose your preferred seats and enjoy your movie experience.
          </p>

        </div>
      </div>

      {/* Selected Movie Information */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <h2 className="font-bold text-gray-800 mb-4">
          Booking Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <CalendarDays className="text-[#3B4FE8]" size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Booking Date</p>
              <p className="text-sm font-semibold text-gray-800">
                {booking.date || 'Not selected'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Film className="text-[#3B4FE8]" size={19} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Movie Name</p>
              <p className="text-sm font-semibold text-gray-800">
                {booking.movieName || 'Not selected'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Theatre and Show Selection */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <h2 className="font-bold text-gray-800 mb-4">
          Select Your Show
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Theatre */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin size={16} className="text-[#3B4FE8]" />
              Select Theatre
            </label>

            <select
              value={theatre}
              onChange={(e) => {
                setTheatre(e.target.value)
                setShowTime('')
                setSelectedSeats([])
              }}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3B4FE8]"
            >
              <option value="">Choose theatre</option>

              {theatres.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}

            </select>
          </div>

          {/* Show Time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Clock size={16} className="text-[#3B4FE8]" />
              Select Show Time
            </label>

            <select
              value={showTime}
              onChange={(e) => {
                setShowTime(e.target.value)
                setSelectedSeats([])
              }}
              disabled={!theatre}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3B4FE8] disabled:bg-gray-50"
            >
              <option value="">Choose show time</option>

              {showTimes.map(item => (
                <option key={item.id} value={item.id}>
                  {item.time}
                </option>
              ))}

            </select>
          </div>

          {/* Seat Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Armchair size={16} className="text-[#3B4FE8]" />
              Select Seat Type
            </label>

            <select
              value={seatType}
              onChange={(e) => {
                setSeatType(e.target.value)
                setSelectedSeats([])
              }}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#3B4FE8]"
            >
              <option value="">Choose seat type</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

        </div>
      </div>

      {/* Seat Selection */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <div className="flex items-center gap-2 mb-5">
          <Armchair size={20} className="text-[#3B4FE8]" />
          <h2 className="font-bold text-gray-800">
            Select Your Seats
          </h2>
        </div>

        {/* Screen */}
        <div className="max-w-lg mx-auto mb-8">

          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs font-semibold mb-3">
            <Monitor size={16} />
            SCREEN
          </div>

          <div className="h-1 bg-gradient-to-r from-transparent via-[#3B4FE8] to-transparent rounded-full" />

        </div>

        {/* Seat Legend */}
        <div className="flex flex-wrap justify-center gap-5 mb-6">

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
            Available
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-3 h-3 rounded bg-red-100 border border-red-300" />
            Booked
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-3 h-3 rounded bg-[#3B4FE8]" />
            Selected
          </div>

        </div>

        {/* Available Seats */}
        {theatre && showTime && seatType ? (

          availableSeats.length > 0 ? (

            <div className="flex flex-wrap justify-center gap-3">

              {availableSeats.map(seat => {

                const isSelected = selectedSeats.includes(seat.seatNumber)

                return (
                  <button
                    key={seat.seatNumber}
                    disabled={!seat.available}
                    onClick={() => handleSeatSelect(seat.seatNumber)}
                    className={`w-11 h-10 rounded-lg text-xs font-bold transition-all
                      ${isSelected
                        ? 'bg-[#3B4FE8] text-white'
                        : seat.available
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-400 border border-red-100 cursor-not-allowed'
                      }`}
                  >
                    {seat.seatNumber}
                  </button>
                )
              })}

            </div>

          ) : (

            <p className="text-center text-sm text-gray-400 py-8">
              No seat information available yet.
            </p>

          )

        ) : (

          <p className="text-center text-sm text-gray-400 py-8">
            Please select a theatre, show time and seat type to view available seats.
          </p>

        )}

        {/* Selected Seats */}
        <div className="mt-6 pt-5 border-t border-gray-100">

          <p className="text-sm font-semibold text-gray-700 mb-2">
            Selected Seat Numbers
          </p>

          <div className="flex flex-wrap gap-2">

            {selectedSeats.length > 0 ? (

              selectedSeats.map(seat => (
                <span
                  key={seat}
                  className="px-3 py-1 rounded-lg bg-blue-50 text-[#3B4FE8] text-xs font-bold"
                >
                  {seat}
                </span>
              ))

            ) : (

              <p className="text-xs text-gray-400">
                No seats selected.
              </p>

            )}

          </div>

        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        <div className="flex items-center gap-2 mb-5">
          <CreditCard size={20} className="text-[#3B4FE8]" />
          <h2 className="font-bold text-gray-800">
            Booking Summary
          </h2>
        </div>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">Selected Seats</span>
            <span className="font-semibold text-gray-800">
              {selectedSeats.length}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Seat Numbers</span>
            <span className="font-semibold text-gray-800">
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-800">
              Final Price
            </span>

            <span className="text-2xl font-black text-[#3B4FE8]">
              {finalPrice !== null ? `LKR ${finalPrice}` : 'Pending'}
            </span>
          </div>

          <p className="text-xs text-gray-400">
            Final ticket price will be calculated and returned by the backend.
          </p>

        </div>

        <button
          disabled={selectedSeats.length === 0}
          className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3B4FE8] text-white text-sm font-bold hover:bg-[#2D3FD6] transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <CheckCircle size={17} />
          Continue to Booking
        </button>

      </div>

      {/* Footer */}
      <div className="text-center py-3">
        <p className="text-xs text-gray-400">
          Movie Tracker · Enjoy your movie experience
        </p>
      </div>

    </div>
  )
}
