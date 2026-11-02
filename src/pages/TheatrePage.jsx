import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Theater, Plus, Ticket } from 'lucide-react'

import TheatreCard from '../components/TheatreCard'
import { getAllTheatres } from '../services/theatreService'

export default function TheatrePage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch theatre events from backend
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const data = await getAllTheatres()
        setEvents(data || [])
      } catch (err) {
        console.error('Error fetching theatre events:', err)
        setError('Failed to load theatre events. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTheatres()
  }, [])

  // Featured event
  const featuredEvent = events.length > 0 ? events[0] : null

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Theater className="text-[#3B4FE8]" size={26} />
            Theatre
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Upcoming stage performances & events
          </p>
        </div>

        <button
          id="add-theatre-btn"
          onClick={() => navigate('/theatre/add')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus size={16} />
          Add Theatre
        </button>
      </div>

      {/* Featured Banner */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0533 0%, #4C1D95 50%, #7C3AED 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 50%, #A78BFA 0%, transparent 60%)',
          }}
        />

        <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-1">
          Featured Theatre Event
        </p>

        {loading ? (
          <h2 className="text-xl font-bold">
            Loading featured event...
          </h2>
        ) : featuredEvent ? (
          <>
            <h2 className="text-2xl font-bold mb-1">
              {featuredEvent.title || featuredEvent.theatreName || featuredEvent.name}
            </h2>
            <p className="text-white/70 text-sm">
              {featuredEvent.description || 'Discover this theatre event.'}
            </p>
          </>
        ) : (
          <h2 className="text-xl font-bold">
            No featured event available
          </h2>
        )}

        <button
          id="theatre-featured-book-btn"
          disabled={!featuredEvent}
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-purple-700 text-sm font-bold hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Ticket size={15} />
          Ticket Booking
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500 py-10">
            Loading theatre events...
          </p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500 py-10">
            {error}
          </p>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <TheatreCard
              key={event.theatreId || event.id || index}
              event={event}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No theatre events available.
          </p>
        )}
      </div>
    </div>
  )
}
