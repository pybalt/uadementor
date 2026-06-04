import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Tutors from './pages/Tutors'
import TutorProfile from './pages/TutorProfile'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { loadUser } from './services/api'

export default function App() {
  // Persistir sesión entre recargas usando localStorage
  const [user, setUser] = useState(() => loadUser())

  function handleLogin(u) {
    setUser(u)
  }

  function handleLogout() {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>UADE Mentor</h1>
        </header>

        <Nav user={user} />

        <main>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/tutors/:id" element={<TutorProfile user={user} />} />
            <Route path="/bookings" element={<Bookings user={user} />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
