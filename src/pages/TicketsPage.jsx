
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket } from 'lucide-react'

import BookingSearchForm from '../components/BookingSearchForm'
import { getAllShows } from '../services/showService'

export default function TicketsPage() {
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [showId, setShowId] = useState('')
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadShows = async () => {
      try {
        const response = await getAllShows()
        const availableShows = Array.isArray(response)
          ? response
          : response?.content || response?.data || []

        if (!ignore) setShows(availableShows)
      } catch (loadError) {
        console.error('Error loading shows for ticket search:', loadError)
        if (!ignore) setError('Could not load shows. Please try again.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadShows()
    return () => { ignore = true }
  }, [])

  function handleSearch() {
    const selectedShow = shows.find((show, index) =>
      String(show.showId ?? show.id ?? show.ID ?? index) === showId
    )

    if (!selectedShow) return

    navigate('/tickets/results', { state: { date, show: selectedShow } })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Ticket className="text-[#3B4FE8]" size={26} />
          Tickets & Pricing
        </h1>

        <p className="text-gray-500 text-sm mt-1">Choose a booking date and an available show.</p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-800">Find a Show</h2>
        <BookingSearchForm
          date={date}
          setDate={setDate}
          showId={showId}
          setShowId={setShowId}
          shows={shows}
          loading={loading}
          onSearch={handleSearch}
        />
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {!loading && !error && shows.length === 0 && (
        <p className="text-sm text-gray-500">There are no shows available to book.</p>
      )}
    </div>
  )
}
