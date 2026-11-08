import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Clapperboard, MapPin, Ticket } from 'lucide-react'

import { getAllTheatres } from '../services/theatreService'

function getId(entity) {
  return entity?.theatreId ?? entity?.showId ?? entity?.id ?? entity?.ID
}

function getDetails(entity, excludedKeys = []) {
  if (!entity || typeof entity !== 'object') return []

  return Object.entries(entity)
    .filter(([key, value]) => (
      !excludedKeys.includes(key) &&
      value !== null &&
      value !== undefined &&
      typeof value !== 'object'
    ))
    .map(([key, value]) => ({
      label: key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^\w/, letter => letter.toUpperCase()),
      value: typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value),
    }))
}

function DetailsSection({ title, icon: Icon, details, emptyText }) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
        <Icon size={18} className="text-[#3B4FE8]" />
        {title}
      </h2>
      {details.length ? (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {details.map(({ label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-800 break-words">{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-sm text-gray-500">{emptyText}</p>
      )}
    </section>
  )
}

export default function TicketSearchResultsPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const bookingDate = state?.date
  const show = state?.show
  const [theatre, setTheatre] = useState(show?.theatre || null)

  useEffect(() => {
    if (!show) return

    let ignore = false
    const theatreId = show.theatreId ?? getId(show.theatre)

    if (show.theatre || theatreId === undefined || theatreId === null) return

    getAllTheatres()
      .then((response) => {
        const theatres = Array.isArray(response)
          ? response
          : response?.content || response?.data || []
        const match = theatres.find(item => String(getId(item)) === String(theatreId))
        if (!ignore && match) setTheatre(match)
      })
      .catch((error) => {
        console.error('Error loading theatre details:', error)
      })

    return () => { ignore = true }
  }, [show])

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
          Select a show from Tickets & Pricing to view its details.
        </p>
      </div>
    )
  }

  const movie = show.movie
  const showDetails = getDetails(show, ['theatre', 'movie'])
  if (movie && typeof movie === 'object') {
    const movieTitle = movie.movieName || movie.title || movie.name
    if (movieTitle && !showDetails.some(detail => detail.label.toLowerCase() === 'movie name')) {
      showDetails.unshift({ label: 'Movie', value: movieTitle })
    }
  }

  const theatreDetails = getDetails(theatre)
  if (!theatreDetails.length && show.theatreId !== undefined) {
    theatreDetails.push({ label: 'Theatre Id', value: String(show.theatreId) })
  }
  if (bookingDate) showDetails.unshift({ label: 'Booking Date', value: bookingDate })

  return (
    <div className="space-y-6 animate-fade-in-up">
      <button
        onClick={() => navigate('/tickets')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#3B4FE8]"
      >
        <ArrowLeft size={17} /> Back to Tickets
      </button>

      <header>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Ticket size={25} className="text-[#3B4FE8]" />
          Show and Theatre Details
        </h1>
        <p className="mt-1 text-sm text-gray-500">Details for your selected show.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DetailsSection
          title="Show Details"
          icon={Clapperboard}
          details={showDetails}
          emptyText="No show details were returned."
        />
        <DetailsSection
          title="Theatre Details"
          icon={MapPin}
          details={theatreDetails}
          emptyText="Theatre details are not available for this show."
        />
      </div>

      {bookingDate && (
        <p className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} /> Booking date: {bookingDate}
        </p>
      )}
    </div>
  )
}