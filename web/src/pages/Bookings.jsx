import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  getSesionesByAlumno, 
  getSesionesByTutor, 
  cancelarSesion, 
  aceptarSesion, 
  concretarSesion 
} from '../services/api'
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

  const isTutor = user && user.role === 'tutor'

  useEffect(() => {
    if (!user) return
    setLoading(true)
    
    const fetchPromise = isTutor
      ? getSesionesByTutor(user.id)
      : getSesionesByAlumno(user.id)

    fetchPromise
      .then(setList)
      .catch(() => getBookingsForUser(user.id).then(setList))
      .finally(() => setLoading(false))
  }, [user, isTutor])

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

  async function onAceptar(id) {
    try {
      await aceptarSesion(id)
      setMsg('Sesión aceptada exitosamente.')
      setList(l => l.map(s => s.id === id ? { ...s, estado: 'Aceptado' } : s))
    } catch (e) {
      setMsg('Error al aceptar: ' + e.message)
    }
  }

  async function onConcretar(id) {
    try {
      await concretarSesion(id)
      setMsg('Sesión marcada como concretada.')
      setList(l => l.map(s => s.id === id ? { ...s, estado: 'Concretado' } : s))
    } catch (e) {
      setMsg('Error al concretar: ' + e.message)
    }
  }

  if (!user) return (
    <div>
      <p>Necesitás <a href="/login" style={{ color: 'var(--accent-2)' }}>iniciar sesión</a> para ver tus reservas.</p>
    </div>
  )

  return (
    <div>
      <h2>{isTutor ? 'Mis Tutorías (como Mentor)' : 'Mis Reservas'}</h2>

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
          {isTutor ? 'No tenés tutorías programadas todavía.' : 'No tenés reservas todavía.'}{' '}
          {!isTutor && <a href="/tutors" style={{ color: 'var(--accent-2)' }}>Buscá un tutor</a>}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
        {list.map((s, i) => {
          const estado = s.estado || s.status || 'Pendiente'
          
          const oppositePartyName = isTutor
            ? (s.alumno ? `${s.alumno.nombre} ${s.alumno.apellido}` : `Alumno #${s.alumnoId || '—'}`)
            : (s.tutor ? `${s.tutor.nombre} ${s.tutor.apellido}` : `Tutor #${s.tutorId || '—'}`)

          const labelParty = isTutor ? 'Alumno' : 'Tutor'

          const fecha = s.fechaInicio
            ? new Date(s.fechaInicio).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
            : s.date || '—'
          
          const cancelable = !['SesionCancelada', 'Cancelado', 'Concretado'].includes(estado)
          const aceptable = isTutor && estado === 'Reservado'
          const concretable = isTutor && estado === 'Aceptado'

          return (
            <div key={s.id || i} style={{
              padding: '14px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{oppositePartyName} <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400 }}>({labelParty})</span></div>
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

                {/* Acciones para Tutor */}
                {aceptable && (
                  <button
                    onClick={() => onAceptar(s.id)}
                    style={{ background: 'rgba(168,230,163,0.15)', color: '#a8e6a3', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                  >
                    Aceptar
                  </button>
                )}
                {concretable && (
                  <button
                    onClick={() => onConcretar(s.id)}
                    style={{ background: 'rgba(109,220,109,0.15)', color: '#6ddc6d', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                  >
                    Concretar
                  </button>
                )}

                {/* Cancelar (común o condicionado) */}
                {cancelable && (
                  <button
                    onClick={() => onCancelar(s.id)}
                    style={{ background: 'rgba(255,107,107,0.15)', color: '#ff6b6b', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
                  >
                    {isTutor ? 'Rechazar / Cancelar' : 'Cancelar'}
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
