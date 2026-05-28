import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Tutors from './pages/Tutors'
import TutorProfile from './pages/TutorProfile'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'
import Login from './pages/Login'

export default function App() {
  const [user,setUser] = useState(null)

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>UADE Mentor</h1>
        </header>

        <Nav user={user} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/tutors/:id" element={<TutorProfile user={user} />} />
            <Route path="/bookings" element={<Bookings user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
