import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MoviesPage from './pages/MoviesPage'
import AddMoviePage from './pages/AddMoviePage'
import ShowsPage from './pages/ShowsPage'
import AddShowPage from './pages/AddShowPage'
import TheatrePage from './pages/TheatrePage'
import AddTheatrePage from './pages/AddTheatrePage'
import TicketsPage from './pages/TicketsPage'
import SettingsPage from './pages/SettingsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookingDetailsPage from './pages/BookingDetailsPage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dedicated Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage initialMode="register" />} />

        {/* Main Application Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />

          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/add" element={<AddMoviePage />} />
          <Route path="add-movie" element={<AddMoviePage />} />

          <Route path="shows" element={<ShowsPage />} />
          <Route path="shows/add" element={<AddShowPage />} />
          <Route path="add-show" element={<AddShowPage />} />

          <Route path="theatre" element={<TheatrePage />} />
          <Route path="theatre/add" element={<AddTheatrePage />} />
          <Route path="add-theatre" element={<AddTheatrePage />} />

          <Route path="tickets" element={<TicketsPage />} />
          <Route path="booking-details" element={<BookingDetailsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
