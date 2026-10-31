
import { Tv2, Plus } from 'lucide-react'

import ShowCard from '../components/ShowCard'

export default function ShowsPage() {

  // Backend data will be fetched here later
  const shows = []

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Page Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Tv2 className="text-[#3B4FE8]" size={26} />
            TV Shows
          </h1>

          <p className="text-gray-500 text-sm mt-0.5">
            Explore your favourite TV shows
          </p>
        </div>

        <button
          id="add-show-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200"
        >
          <Plus size={16} />
          Add Show
        </button>

      </div>

      {/* All Shows */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-700">
            All Shows
          </h2>
        </div>

        <div className="divide-y divide-gray-50">

          {shows.length > 0 ? (

            shows.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
              />
            ))

          ) : (

            <p className="text-center text-gray-500 py-10">
              No TV shows available.
            </p>

          )}

        </div>

      </div>

    </div>
  )
}
