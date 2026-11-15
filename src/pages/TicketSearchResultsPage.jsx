import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Armchair, CalendarDays, CheckCircle, Clapperboard, MapPin, Ticket } from 'lucide-react'

import { createBooking, getAllBookings, getRemainingSeats } from '../services/ticketService'
import { getAllTheatres } from '../services/theatreService'

function getList(response) {
  return Array.isArray(response) ? response : response?.content || response?.data || []
}

function getErrorMessage(error) {
  const responseData = error.response?.data
  if (typeof responseData === 'string') return responseData
  return responseData?.message || responseData?.error || error.message || 'Please try again.'
}

export default function TicketSearchResultsPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const bookingDate = state?.date
  const show = state?.show
  const showId = show?.showId ?? show?.id ?? show?.ID
  const movieName = show?.movie?.movieName || show?.movie?.title || show?.movieName || show?.title || show?.name || 'Selected show'
  const showName = show?.showName || show?.name || movieName
  const showTime = show?.showTime || show?.time || 'Not provided'
  const ticketPrice = Number(show?.ticketPrice ?? show?.price)
  const theatreId = show?.theatreId ?? show?.theatre?.theatreId ?? show?.theatre?.id
  const [theatre, setTheatre] = useState(show?.theatre || null)
  const [remainingSeats, setRemainingSeats] = useState(null)
  const [seatCount, setSeatCount] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [availableSeats, setAvailableSeats] = useState([])
  const [loadingSeats, setLoadingSeats] = useState(showId !== undefined && showId !== null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  // Close the success popup with the Escape key
  useEffect(() => {
    if (!showSuccessPopup) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setShowSuccessPopup(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSuccessPopup])

  useEffect(() => {
    if (showId === undefined || showId === null) return

    let ignore = false
    async function loadBookingAvailability() {
      try {
        const [remainingResult, bookingsResult, theatresResult] = await Promise.allSettled([
          getRemainingSeats(showId),
          getAllBookings(),
          show?.theatre ? Promise.resolve([show.theatre]) : getAllTheatres(),
        ])

        if (ignore) return
        if (remainingResult.status === 'rejected') throw remainingResult.reason

        const remaining = Number(remainingResult.value)
        setRemainingSeats(Number.isFinite(remaining) ? Math.max(0, remaining) : null)
        setSeatCount(remaining > 0 ? 1 : 0)

        const theatres = theatresResult.status === 'fulfilled' ? getList(theatresResult.value) : []
        const selectedTheatre = show?.theatre || theatres.find(item =>
          String(item.theatreId ?? item.id ?? item.ID) === String(theatreId)
        )
        if (selectedTheatre) setTheatre(selectedTheatre)

        if (bookingsResult.status === 'rejected') {
          throw new Error(`Could not load booked seat numbers. ${getErrorMessage(bookingsResult.reason)}`)
        }

        const bookings = getList(bookingsResult.value)
        const bookedSeatNumbers = new Set(
          bookings
            .filter(booking => String(booking.show?.id ?? booking.show?.showId ?? booking.showId) === String(showId))
            .flatMap(booking => booking.seatNumbers || [])
            .map(Number)
        )
        const capacity = Number(selectedTheatre?.capacity)
        if (Number.isFinite(capacity) && capacity > 0) {
          setAvailableSeats(
            Array.from({ length: capacity }, (_, index) => index + 1)
              .filter(seatNumber => !bookedSeatNumbers.has(seatNumber))
          )
        } else {
          throw new Error('Theatre capacity is unavailable, so seats cannot be selected.')
        }
      } catch (loadError) {
        console.error('Error loading booking availability:', loadError)
        if (!ignore) setError(getErrorMessage(loadError))
      } finally {
        if (!ignore) setLoadingSeats(false)
      }
    }

    loadBookingAvailability()

    return () => { ignore = true }
  }, [showId, show, theatreId])

  async function handleBooking() {
    if (showId === undefined || showId === null || !seatCount || seatCount > remainingSeats || selectedSeats.length !== seatCount) return

    setSubmitting(true)
    setError('')
    try {
      await createBooking({
        showId,
        bookingDate,
        numberOfTickets: seatCount,
        seatNumbers: selectedSeats,
        totalAmount: Number.isFinite(ticketPrice) ? ticketPrice * seatCount : 0,
      })
      setRemainingSeats(current => current - seatCount)
      setAvailableSeats(current => current.filter(seatNumber => !selectedSeats.includes(seatNumber)))
      setSuccess(true)
      setShowSuccessPopup(true)
    } catch (bookingError) {
      console.error('Error confirming booking:', bookingError)
      setError(`Booking could not be completed. ${getErrorMessage(bookingError)}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (!show) {
    return (
      <div className="space-y-5">
        <button
          onClick={() => navigate('/tickets')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#3B4FE8]"
        >
          <ArrowLeft size={17} /> Back to Tickets
        </button>
        <p className="rounded-lg border border-gray-200 bg-white p-5 text-sm text-gray-600">
          Select a show from Tickets & Pricing to book tickets.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in-up">
      <button
        onClick={() => navigate('/tickets')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#3B4FE8]"
      >
        <ArrowLeft size={17} /> Back to Tickets
      </button>

      <header>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Ticket size={25} className="text-[#3B4FE8]" />
          Tickets &amp; Pricing
        </h1>
        <p className="mt-1 text-sm text-gray-500">Review availability and confirm your booking.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
        <div className="space-y-4">
          <section className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="flex items-center gap-2 font-bold text-gray-800">
              <Clapperboard size={18} className="text-[#3B4FE8]" />
              Show Details
            </h2>
            <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div><dt className="text-xs text-gray-500">Movie</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{movieName}</dd></div>
              <div><dt className="text-xs text-gray-500">Show</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{showName}</dd></div>
              <div><dt className="text-xs text-gray-500">Show date</dt><dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-800"><CalendarDays size={15} />{show?.showDate || bookingDate || 'Not provided'}</dd></div>
              <div><dt className="text-xs text-gray-500">Show time</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{showTime}</dd></div>
              {Number.isFinite(ticketPrice) && ticketPrice > 0 && <div><dt className="text-xs text-gray-500">Ticket price</dt><dd className="mt-1 text-sm font-semibold text-gray-800">LKR {ticketPrice.toLocaleString()}</dd></div>}
            </dl>
          </section>

          <section className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="flex items-center gap-2 font-bold text-gray-800">
              <MapPin size={18} className="text-[#3B4FE8]" />
              Theatre Details
            </h2>
            <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div><dt className="text-xs text-gray-500">Theatre</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{theatre?.theatreName || theatre?.name || theatreId || 'Not provided'}</dd></div>
              <div><dt className="text-xs text-gray-500">Location</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{theatre?.location || 'Not provided'}</dd></div>
              <div><dt className="text-xs text-gray-500">Capacity</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{theatre?.capacity ?? 'Not provided'}</dd></div>
              {bookingDate && <div><dt className="text-xs text-gray-500">Booking date</dt><dd className="mt-1 text-sm font-semibold text-gray-800">{bookingDate}</dd></div>}
            </dl>
          </section>
        </div>

      <section className="w-full bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-end justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <p className="text-sm text-gray-500">Remaining seats</p>
            <p className="mt-1 text-3xl font-bold text-gray-900" aria-live="polite">
              {loadingSeats ? '...' : remainingSeats ?? 'Unavailable'}
            </p>
          </div>
          {Number.isFinite(ticketPrice) && ticketPrice > 0 && (
            <p className="text-right text-sm text-gray-500">Price per seat<span className="block text-lg font-bold text-gray-900">LKR {ticketPrice.toLocaleString()}</span></p>
          )}
        </div>

        <label htmlFor="seat-count" className="mt-5 block text-sm font-semibold text-gray-700">Your seat count</label>
        <input
          id="seat-count"
          type="number"
          min={remainingSeats > 0 ? 1 : 0}
          max={remainingSeats ?? undefined}
          value={seatCount}
          onChange={event => {
            const count = Math.max(0, Math.min(Number(event.target.value), remainingSeats ?? 0))
            setSeatCount(count)
            setSelectedSeats(current => current.slice(0, count))
            setSuccess(false)
          }}
          disabled={loadingSeats || remainingSeats === null || remainingSeats === 0 || success}
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#3B4FE8] focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
        />

        <div className="mt-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700"><Armchair size={16} />Choose {seatCount} seat{seatCount === 1 ? '' : 's'}</p>
          {loadingSeats ? (
            <p className="text-sm text-gray-500">Loading seats...</p>
          ) : availableSeats.length ? (
            <div className="max-h-60 overflow-y-auto pr-1">
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 xl:grid-cols-10">
              {availableSeats.map(seatNumber => {
                const isSelected = selectedSeats.includes(seatNumber)
                const limitReached = !isSelected && selectedSeats.length >= seatCount
                return (
                  <button
                    key={seatNumber}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={limitReached || success}
                    onClick={() => {
                      setSelectedSeats(current => isSelected
                        ? current.filter(seat => seat !== seatNumber)
                        : [...current, seatNumber])
                      setSuccess(false)
                    }}
                    className={`rounded border px-2 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${isSelected ? 'border-[#3B4FE8] bg-[#3B4FE8] text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-[#3B4FE8]'}`}
                  >
                    {seatNumber}
                  </button>
                )
              })}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No selectable seat numbers are available.</p>
          )}
          <p className="mt-2 text-xs text-gray-500">Selected: {selectedSeats.length ? selectedSeats.join(', ') : 'None'}</p>
        </div>

        {Number.isFinite(ticketPrice) && ticketPrice > 0 && seatCount > 0 && (
          <p className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-sm">
            <span className="text-gray-500">Estimated total</span>
            <strong className="text-gray-900">LKR {(ticketPrice * seatCount).toLocaleString()}</strong>
          </p>
        )}

        {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
        {!loadingSeats && remainingSeats === 0 && <p className="mt-4 text-sm text-amber-700">This show is sold out.</p>}

        <button
          type="button"
          onClick={handleBooking}
          disabled={loadingSeats || submitting || remainingSeats === null || remainingSeats === 0 || seatCount < 1 || selectedSeats.length !== seatCount || success}
          className="mt-5 w-full rounded-md bg-[#3B4FE8] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2D3FD6] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {submitting ? 'Confirming booking...' : 'Confirm your booking'}
        </button>
      </section>
      </div>

      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl animate-fade-in-up"
            onClick={event => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h2 id="booking-success-title" className="mt-4 text-xl font-bold text-gray-900">
              Your booking was successful.
            </h2>
            <dl className="mt-4 space-y-2 rounded-lg bg-gray-50 p-4 text-left text-sm">
              <div className="flex justify-between gap-4"><dt className="text-gray-500">Movie</dt><dd className="font-semibold text-gray-800 text-right">{movieName}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-500">Show time</dt><dd className="font-semibold text-gray-800">{showTime}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-500">Seats</dt><dd className="font-semibold text-gray-800 text-right">{selectedSeats.join(', ')}</dd></div>
              {Number.isFinite(ticketPrice) && ticketPrice > 0 && (
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-2"><dt className="text-gray-500">Total</dt><dd className="font-bold text-gray-900">LKR {(ticketPrice * seatCount).toLocaleString()}</dd></div>
              )}
            </dl>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/tickets')}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back to Tickets
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => setShowSuccessPopup(false)}
                className="flex-1 rounded-md bg-[#3B4FE8] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#2D3FD6]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}