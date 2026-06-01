import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSesionesByAlumno, cancelarSesion } from '../services/api'
import { getBookingsForUser } from '../services/mockApi'

const ESTADO_COLOR = {
  Disponible: '#88d1ff',
  Reservado: '#ffd28a',
  Aceptado: '#a8e6a3',
  Concretado: '#6ddc6d',
  SesionCancelada: '#ff6b6b',
  Pendiente: '#ffd28a',
  Cancelado: '#ff6b6b',
}

export default function Bookings({ user }) {
  const nav = useNavigate()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!user) return
    setLoading(true)
    // Intentar con backend real, fallback a mock
    getSesionesByAlumno(user.id)
      .then(setList)
      .catch(() => getBookingsForUser(user.id).then(setList))
      .finally(() => setLoading(false))
  }, [user])

  async function onCancelar(id) {
    if (!confirm('¿Cancelar esta sesión?')) return
    try {
      await cancelarSesion(id)
      setMsg('Sesión cancelada.')
      setList(l => l.map(s => s.id === id ? { ...s, estado: 'SesionCancelada' } : s))
    } catch (e) {
      setMsg('Error al cancelar: ' + e.message)
    }
  }

  if (!user) return (
    <div>
      <p>Necesitás <a href="/login" style={{ color: 'var(--accent-2)' }}>iniciar sesión</a> para ver tus reservas.</p>
    </div>
  )

  return (
    <div>
      <h2>Mis Reservas</h2>

      {msg && (
        <div style={{
          marginBottom: 12, padding: '8px 12px', borderRadius: 8, fontSize: 14,
          background: msg.startsWith('Error') ? 'rgba(255,107,107,0.08)' : 'rgba(100,220,100,0.08)',
          color: msg.startsWith('Error') ? '#ff6b6b' : '#6ddc6d'
        }}>
          {msg}
        </div>
      )}

      {loading && <p style={{ color: 'var(--muted)' }}>Cargando...</p>}

      {!loading && list.length === 0 && (
        <div style={{ color: 'var(--muted)', marginTop: 12 }}>
          No tenés reservas todavía.{' '}
          <a href="/tutors" style={{ color: 'var(--accent-2)' }}>Buscá un tutor</a>.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
        {list.map((s, i) => {
          const estado = s.estado || s.status || 'Pendiente'
          const tutorNombre = s.tutor
            ? `${s.tutor.nombre} ${s.tutor.apellido}`
            : `Tutor #${s.tutorId || '—'}`
          const fecha = s.fechaInicio
            ? new Date(s.fechaInicio).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
            : s.date || '—'
          const cancelable = !['SesionCancelada', 'Cancelado', 'Concretado'].includes(estado)

          return (
            <div key={s.id || i} style={{
              padding: '14px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{tutorNombre}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{fecha}</div>
                {s.total > 0 && (
                  <div style={{ color: 'var(--muted)', fontSize: 13 }}>Total: ${s.total}</div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                  background: 'rgba(255,255,255,0.04)',
                  color: ESTADO_COLOR[estado] || 'var(--muted)'
                }}>
                  {estado}
                </span>
                {cancelable && (
                  <button
                    onClick={() => onCancelar(s.id)}
                    style={{ background: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
