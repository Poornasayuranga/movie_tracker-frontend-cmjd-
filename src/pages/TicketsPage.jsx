import { Ticket, Tag, Percent, CreditCard, Star, Zap, ChevronRight, Check } from 'lucide-react'

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

const offers = [
  { id: 1, code: 'MOVIE20', discount: '20% OFF', desc: 'On all weekend shows', expires: 'Oct 31, 2026', color: '#3B4FE8' },
  { id: 2, code: 'VIP50', discount: '$50 OFF', desc: 'On VIP tickets above $200', expires: 'Nov 15, 2026', color: '#7C3AED' },
  { id: 3, code: 'FIRST10', discount: '10% OFF', desc: 'First-time booking discount', expires: 'Dec 31, 2026', color: '#059669' },
]

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

      {/* Offer coupons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {offers.map(offer => (
          <div
            key={offer.id}
            id={`offer-${offer.id}`}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group relative overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10"
              style={{ background: offer.color, transform: 'translate(30%, -30%)' }}
            />
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${offer.color}18` }}
              >
                <Percent size={16} style={{ color: offer.color }} />
              </div>
              <span
                className="text-lg font-black"
                style={{ color: offer.color }}
              >
                {offer.discount}
              </span>
            </div>
            <p className="text-sm text-gray-700 font-semibold">{offer.desc}</p>
            <div className="flex items-center justify-between mt-3">
              <code
                className="text-xs font-bold px-2 py-1 rounded-lg border border-dashed"
                style={{ color: offer.color, borderColor: offer.color, background: `${offer.color}10` }}
              >
                {offer.code}
              </code>
              <span className="text-[10px] text-gray-400">Exp: {offer.expires}</span>
            </div>
          </div>
        ))}
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
