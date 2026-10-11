import { Theater, MapPin, Calendar, Clock, Star, Plus, Ticket } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Hamlet – National Theatre',
    type: 'Drama',
    venue: 'National Theatre, London',
    date: 'Oct 18, 2026',
    time: '7:30 PM',
    price: '$45 – $120',
    rating: 9.1,
    available: true,
    poster: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=80',
  },
  {
    id: 2,
    title: 'The Phantom of the Opera',
    type: 'Musical',
    venue: 'Broadway Theatre, NYC',
    date: 'Oct 22, 2026',
    time: '8:00 PM',
    price: '$60 – $200',
    rating: 9.4,
    available: true,
    poster: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80',
  },
  {
    id: 3,
    title: 'Swan Lake – Royal Ballet',
    type: 'Ballet',
    venue: 'Royal Opera House, London',
    date: 'Nov 05, 2026',
    time: '6:00 PM',
    price: '$80 – $250',
    rating: 9.6,
    available: false,
    poster: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400&q=80',
  },
  {
    id: 4,
    title: 'Chicago – The Musical',
    type: 'Musical',
    venue: 'West End, London',
    date: 'Nov 12, 2026',
    time: '7:00 PM',
    price: '$50 – $160',
    rating: 8.9,
    available: true,
    poster: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&q=80',
  },
]

export default function TheatrePage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Theater className="text-[#3B4FE8]" size={26} />
            Theatre
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Upcoming stage performances & events</p>
        </div>
        <button
          id="add-theatre-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200"
        >
          <Plus size={16} />
          Add Event
        </button>
      </div>

      {/* Featured banner */}
      <div
        className="rounded-2xl p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0533 0%, #4C1D95 50%, #7C3AED 100%)' }}
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #A78BFA 0%, transparent 60%)' }} />
        <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-1">Featured Tonight</p>
        <h2 className="text-2xl font-bold mb-1">The Phantom of the Opera</h2>
        <div className="flex items-center gap-4 text-white/70 text-sm">
          <span className="flex items-center gap-1"><MapPin size={13} /> Broadway Theatre, NYC</span>
          <span className="flex items-center gap-1"><Calendar size={13} /> Oct 22, 2026</span>
          <span className="flex items-center gap-1"><Clock size={13} /> 8:00 PM</span>
        </div>
        <button
          id="theatre-featured-book-btn"
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-purple-700 text-sm font-bold hover:scale-105 transition-transform duration-200"
        >
          <Ticket size={15} />
          Book Tickets
        </button>
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event, i) => (
          <div
            key={event.id}
            id={`theatre-event-${event.id}`}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold">{event.type}</div>
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-xs font-bold">{event.rating}</span>
              </div>
              {!event.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full">Sold Out</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-sm mb-2">{event.title}</h3>
              <div className="space-y-1 text-xs text-gray-500">
                <p className="flex items-center gap-1.5"><MapPin size={12} className="text-[#3B4FE8]" />{event.venue}</p>
                <p className="flex items-center gap-1.5"><Calendar size={12} className="text-[#3B4FE8]" />{event.date} at {event.time}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-[#3B4FE8] text-sm">{event.price}</span>
                <button
                  id={`theatre-book-${event.id}`}
                  disabled={!event.available}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    event.available
                      ? 'bg-[#3B4FE8] text-white hover:bg-[#2D3FD6] hover:shadow-md'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Ticket size={12} />
                  {event.available ? 'Book Now' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
