import { Ticket, CreditCard, Star, Zap, Check } from 'lucide-react'

const cinemas = [
  {
    id: 1,
    name: 'PVR Cinemas',
    location: 'City Mall, 3rd Floor',
    rating: 4.5,
    plans: [
      { type: 'Standard', price: '$8.99', features: ['Regular Screen', '1 Popcorn', 'Online Booking'] },
      { type: 'Premium', price: '$14.99', features: ['4DX Screen', 'Combo Meal', 'Priority Entry', 'Recliner Seat'] },
      { type: 'VIP', price: '$24.99', features: ['IMAX Screen', 'Full Meal', 'Private Lounge', 'Valet Parking'] },
    ],
  },
  {
    id: 2,
    name: 'Regal Cinemas',
    location: 'Downtown Square',
    rating: 4.3,
    plans: [
      { type: 'Standard', price: '$9.50', features: ['Regular Screen', 'Basic Snack', 'Online Booking'] },
      { type: 'Premium', price: '$16.00', features: ['Dolby Atmos', 'Combo Meal', 'VIP Lane', 'Recliner Seat'] },
      { type: 'VIP', price: '$29.99', features: ['IMAX Screen', 'Fine Dining', 'Premium Lounge', 'Free Parking'] },
    ],
  },
]

const planColors = {
  Standard: { from: '#3B4FE8', to: '#5B6FFF', badge: '#EFF6FF', badgeText: '#3B4FE8' },
  Premium:  { from: '#7C3AED', to: '#A78BFA', badge: '#F5F3FF', badgeText: '#7C3AED' },
  VIP:      { from: '#D97706', to: '#F59E0B', badge: '#FEF9C3', badgeText: '#92400E' },
}


export default function TicketsPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Ticket className="text-[#3B4FE8]" size={26} />
          Tickets & Pricing
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Compare plans and grab the best deals</p>
      </div>

      {/* Cinema pricing */}
      {cinemas.map(cinema => (
        <div key={cinema.id} id={`cinema-${cinema.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-800">{cinema.name}</h2>
              <p className="text-gray-500 text-xs">{cinema.location}</p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-amber-600">{cinema.rating}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {cinema.plans.map(plan => {
              const colors = planColors[plan.type]
              return (
                <div
                  key={plan.type}
                  id={`plan-${cinema.id}-${plan.type.toLowerCase()}`}
                  className="p-5 hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: colors.badge, color: colors.badgeText }}
                    >
                      {plan.type}
                    </span>
                    {plan.type === 'Premium' && (
                      <span className="text-[10px] bg-purple-100 text-purple-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Zap size={9} /> Popular
                      </span>
                    )}
                  </div>
                  <p
                    className="text-3xl font-black mb-1"
                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {plan.price}
                  </p>
                  <p className="text-gray-400 text-xs mb-4">per person</p>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check size={13} className="text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    id={`book-${cinema.id}-${plan.type.toLowerCase()}-btn`}
                    className="w-full py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-1"
                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                  >
                    <CreditCard size={14} />
                    Book Now
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
