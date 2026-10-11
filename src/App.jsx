import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MoviesPage from './pages/MoviesPage'
import ShowsPage from './pages/ShowsPage'
import TheatrePage from './pages/TheatrePage'
import TicketsPage from './pages/TicketsPage'
import SettingsPage from './pages/SettingsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="shows" element={<ShowsPage />} />
          <Route path="theatre" element={<TheatrePage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
