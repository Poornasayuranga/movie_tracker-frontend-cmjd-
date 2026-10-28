import { Film, Plus } from 'lucide-react'
import MovieCard from '../components/MovieCard'


const featuredMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    genre: 'Sci-Fi • Adventure',
    rating: 8.7,
    duration: '2h 46m',
    year: 2024,
    status: 'Watched',
    poster: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=300&q=80',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    genre: 'Drama • History',
    rating: 8.9,
    duration: '3h 0m',
    year: 2023,
    status: 'Watched',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&q=80',
  },
  {
    id: 3,
    title: 'Poor Things',
    genre: 'Comedy • Drama',
    rating: 8.0,
    duration: '2h 21m',
    year: 2023,
    status: 'Watchlist',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&q=80',
  },
  {
    id: 4,
    title: 'Killers of the Flower Moon',
    genre: 'Crime • Drama',
    rating: 7.7,
    duration: '3h 26m',
    year: 2023,
    status: 'Watchlist',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&q=80',
  },
  {
    id: 5,
    title: 'The Zone of Interest',
    genre: 'Drama • War',
    rating: 7.9,
    duration: '1h 45m',
    year: 2023,
    status: 'Watching',
    poster: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=300&q=80',
  },
  {
    id: 6,
    title: 'Past Lives',
    genre: 'Drama • Romance',
    rating: 7.9,
    duration: '1h 46m',
    year: 2023,
    status: 'Watched',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&q=80',
  },
]

export default function MoviesPage() {
  const watchlistMovies = featuredMovies.filter(m => m.status === 'Watchlist')

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Film className="text-[#3B4FE8]" size={26} />
            Movies
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Track and discover your favorite films</p>
        </div>
        <button
          id="add-movie-btn"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B4FE8] text-white text-sm font-semibold hover:bg-[#2D3FD6] transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Add Movie
        </button>
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {watchlistMovies.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
        {/* Add new movie card */}
        <button
          id="add-new-movie-card-btn"
          className="aspect-[2/3] rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#3B4FE8] hover:text-[#3B4FE8] hover:bg-blue-50/50 transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Plus size={20} />
          </div>
          <span className="text-xs font-semibold">Add Movie</span>
        </button>
      </div>
    </div>
  )
}
