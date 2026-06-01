import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTutorById, createBooking, addReview } from '../services/mockApi'

export default function TutorProfile({ user }) {
  const { id } = useParams()
  const nav = useNavigate()
  const [tutor, setTutor] = useState(null)
  const [date, setDate] = useState('')
  const [comment, setComment] = useState('')
  const [stars, setStars] = useState(5)
  const [bookingMsg, setBookingMsg] = useState('')
  const [reviewMsg, setReviewMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getTutorById(id)
      .then(setTutor)
      .finally(() => setLoading(false))
  }, [id])

  async function onBook() {
    if (!user) return nav('/login')
    if (!date) { setBookingMsg('Seleccioná una fecha y hora.'); return }
    try {
      await createBooking({ tutorId: Number(id) || id, userId: user.id, date })
      setBookingMsg('✓ Reserva creada exitosamente.')
      setTimeout(() => nav('/bookings'), 1200)
    } catch (e) {
      setBookingMsg('Error al crear la reserva: ' + e.message)
    }
  }

  async function onReview() {
    if (!user) return nav('/login')
    if (!comment.trim()) { setReviewMsg('Escribí un comentario.'); return }
    try {
      await addReview(id, { userId: user.id, stars: Number(stars), comment })
      setComment('')
      setReviewMsg('✓ Reseña enviada.')
      // Recargar tutor para ver la nueva calificación
      const updated = await getTutorById(id)
      setTutor(updated)
    } catch (e) {
      setReviewMsg('Error al enviar reseña: ' + e.message)
    }
  }

  if (loading) return <div style={{ color: 'var(--muted)' }}>Cargando tutor...</div>
  if (!tutor) return <div style={{ color: '#ff6b6b' }}>Tutor no encontrado.</div>

  // Normalizar campos — el backend devuelve nombre/apellido, el mock devuelve name
  const nombre = tutor.nombre ? `${tutor.nombre} ${tutor.apellido || ''}` : tutor.name
  const materias = tutor.materias
    ? tutor.materias.map(m => m.descripcion || m).join(', ')
    : (tutor.subjects || []).join(', ')
  const rating = tutor.rating ?? '—'
  const reviews = tutor.calificaciones || tutor.reviews || []

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div className="avatar" style={{ width: 72, height: 72, fontSize: 28 }}>
          {nombre.charAt(0)}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{nombre}</h2>
          <span className="rating">{rating}★</span>
          {tutor.ciudadesServicio && (
            <span style={{ marginLeft: 8, color: 'var(--muted)', fontSize: 13 }}>
              {tutor.ciudadesServicio.join(' · ')}
            </span>
          )}
        </div>
      </div>

      {tutor.bio && <p style={{ color: 'var(--muted)' }}>{tutor.bio}</p>}

      <p><strong>Materias:</strong> {materias || '—'}</p>
      {tutor.modality && <p><strong>Modalidad:</strong> {tutor.modality}</p>}
      {tutor.hourlyRate && <p><strong>Tarifa:</strong> ${tutor.hourlyRate}/h</p>}

      <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '20px 0' }} />

      {/* ── Reservar ── */}
      <h3>Reservar sesión</h3>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
        <button onClick={onBook} className="btn btn-primary">Reservar</button>
      </div>
      {bookingMsg && (
        <div style={{
          marginTop: 8, fontSize: 14, padding: '8px 12px', borderRadius: 8,
          background: bookingMsg.startsWith('✓') ? 'rgba(100,220,100,0.08)' : 'rgba(255,107,107,0.08)',
          color: bookingMsg.startsWith('✓') ? '#6ddc6d' : '#ff6b6b'
        }}>
          {bookingMsg}
        </div>
      )}

      <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '20px 0' }} />

      {/* ── Reseñas ── */}
      <h3>Reseñas ({reviews.length})</h3>
      {reviews.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>Todavía no hay reseñas para este tutor.</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {reviews.map((r, i) => (
          <div key={r.id || i} style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{r.user || (r.alumno ? `${r.alumno.nombre} ${r.alumno.apellido}` : 'Alumno')}</strong>
              <span style={{ color: '#ffd28a' }}>{r.stars || r.puntaje}★</span>
            </div>
            <div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 14 }}>
              {r.comment || r.comentario}
            </div>
          </div>
        ))}
      </div>

      <h4 style={{ marginTop: 20 }}>Dejar una reseña</h4>
      {!user && (
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          <a href="/login" style={{ color: 'var(--accent-2)' }}>Iniciá sesión</a> para dejar una reseña.
        </p>
      )}
      {user && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <select value={stars} onChange={e => setStars(e.target.value)} style={{ width: 160 }}>
            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>{n} estrella{n !== 1 ? 's' : ''}</option>
            ))}
          </select>
          <textarea
            placeholder="Contá tu experiencia con este tutor..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            style={{ resize: 'vertical' }}
          />
          <div>
            <button onClick={onReview} className="btn btn-primary">Enviar reseña</button>
          </div>
          {reviewMsg && (
            <div style={{
              fontSize: 14, padding: '8px 12px', borderRadius: 8,
              background: reviewMsg.startsWith('✓') ? 'rgba(100,220,100,0.08)' : 'rgba(255,107,107,0.08)',
              color: reviewMsg.startsWith('✓') ? '#6ddc6d' : '#ff6b6b'
            }}>
              {reviewMsg}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
