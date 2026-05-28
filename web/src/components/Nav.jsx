import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ user }) {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/tutors">Buscar Tutors</Link>
      <Link to="/bookings">Reservas</Link>
      <Link to="/profile">Mi Perfil</Link>
      <div className="nav-spacer" />
      <div className="user-badge">{user ? `Hola, ${user.name}` : <Link to="/login">Entrar</Link>}</div>
    </nav>
  )
}
