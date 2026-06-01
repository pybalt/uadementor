import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../services/api'
import { getBookingsForUser } from '../services/mockApi'
import { getSesionesByAlumno } from '../services/api'

export default function Profile({ user, onLogout }) {
  const nav = useNavigate()
  const [sesiones, setSesiones] = useState([])

  useEffect(() => {
    if (!user?.id) return
    getSesionesByAlumno(user.id)
      .then(setSesiones)
      .catch(() => getBookingsForUser(user.id).then(setSesiones))
  }, [user])

  function handleLogout() {
    logout()
    onLogout()
    nav('/')
  }

  if (!user) return (
    <div>
      <p>
        <Link to="/login" style={{ color: 'var(--accent-2)' }}>Iniciá sesión</Link> para ver tu perfil.
      </p>
    </div>
  )

  const nombre = user.nombre || user.name || user.email
  const rol = user.role === 'tutor' ? 'Tutor' : 'Alumno'
  const completadas = sesiones.filter(s => s.estado === 'Concretado').length
  const pendientes = sesiones.filter(s => !['Concretado', 'SesionCancelada', 'Cancelado'].includes(s.estado)).length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div className="avatar" style={{ width: 64, height: 64, fontSize: 26 }}>
          {nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{nombre} {user.apellido || ''}</h2>
          <span style={{
            display: 'inline-block', marginTop: 4, padding: '3px 10px', borderRadius: 999,
            background: 'rgba(255,255,255,0.04)', color: 'var(--accent)', fontSize: 13, fontWeight: 600
          }}>
            {rol}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12, marginBottom: 20 }}>
        <StatCard label="Email" value={user.email} />
        <StatCard label="Sesiones completadas" value={completadas} />
        <StatCard label="Sesiones pendientes" value={pendientes} />
      </div>

      <h3>Logros</h3>
      {sesiones.length === 0 ? (
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Completá sesiones para desbloquear logros.</p>
      ) : (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {completadas >= 1 && <Badge label="Alumno Comprometido" emoji="🎯" />}
          {completadas >= 3 && <Badge label="Alumno Dedicado" emoji="📚" />}
          {sesiones.length >= 1 && <Badge label="Primera Reserva" emoji="✨" />}
        </div>
      )}

      <div style={{ marginTop: 28 }}>
        <button
          onClick={handleLogout}
          style={{ background: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: 'none', padding: '10px 18px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={{
      padding: '14px 16px', borderRadius: 12,
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)'
    }}>
      <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--accent)' }}>{value}</div>
    </div>
  )
}

function Badge({ label, emoji }) {
  return (
    <div style={{
      padding: '8px 14px', borderRadius: 999,
      background: 'rgba(230,177,90,0.08)', border: '1px solid rgba(230,177,90,0.15)',
      color: 'var(--accent)', fontSize: 13, fontWeight: 600, display: 'flex', gap: 6, alignItems: 'center'
    }}>
      <span>{emoji}</span> {label}
    </div>
  )
}
