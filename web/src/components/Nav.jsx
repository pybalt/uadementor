import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav({ user }) {
  const { pathname } = useLocation()

  function navLink(to, label) {
    const active = pathname === to
    return (
      <Link to={to} style={{ color: active ? 'var(--accent)' : 'var(--muted)', fontWeight: active ? 700 : 400 }}>
        {label}
      </Link>
    )
  }

  const nombre = user
    ? (user.nombre || user.name || user.email || '').split(' ')[0]
    : null

  return (
    <nav>
      {navLink('/', 'Inicio')}
      {navLink('/tutors', 'Tutores')}
      {navLink('/bookings', 'Mis Reservas')}
      {navLink('/profile', 'Mi Perfil')}
      <div className="nav-spacer" />
      <div className="user-badge">
        {user ? (
          <Link to="/profile" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            👤 {nombre}
          </Link>
        ) : (
          <span style={{ display: 'flex', gap: 10 }}>
            <Link to="/login" style={{ color: 'var(--muted)' }}>Entrar</Link>
            <Link to="/register" style={{ color: 'var(--accent-2)', fontWeight: 600 }}>Registrarse</Link>
          </span>
        )}
      </div>
    </nav>
  )
}
