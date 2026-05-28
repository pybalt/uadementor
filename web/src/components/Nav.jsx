import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ user }) {
  return (
    <nav style={{display:'flex',gap:12,marginBottom:18,alignItems:'center'}}>
      <Link to="/">Inicio</Link>
      <Link to="/tutors">Buscar Tutors</Link>
      <Link to="/bookings">Reservas</Link>
      <Link to="/profile">Mi Perfil</Link>
      <div style={{marginLeft:'auto'}}>{user ? `Hola, ${user.name}` : <Link to="/login">Entrar</Link>}</div>
    </nav>
  )
}
