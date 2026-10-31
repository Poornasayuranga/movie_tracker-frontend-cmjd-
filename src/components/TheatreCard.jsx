import { MapPin, Calendar, Star, Ticket } from 'lucide-react'

export default function TheatreCard({ event }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">

      {/* Event Poster */}
      <div className="h-44 overflow-hidden relative">
        <img
          src={event.poster}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold">
          {event.type}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold">{event.rating}</span>
        </div>

        {!event.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-4">

        <h3 className="font-bold text-gray-800 text-sm mb-2">
          {event.title}
        </h3>

        <div className="space-y-1 text-xs text-gray-500">

          <p className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#3B4FE8]" />
            {event.venue}
          </p>

          <p className="flex items-center gap-1.5">
            <Calendar size={12} className="text-[#3B4FE8]" />
            {event.date} at {event.time}
          </p>

        </div>

        {/* Price and Booking */}
        <div className="flex items-center justify-between mt-3">

          <span className="font-bold text-[#3B4FE8] text-sm">
            {event.price}
          </span>

          <button
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
  )
}