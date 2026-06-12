import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getTutorById, createBooking, addReview, editLocalReview, deleteLocalReview, getBookingsForUser } from '../services/mockApi'
import { Alert, Avatar, Badge, Button, Card, Input, Modal, Page, RatingStars, Select, Tag, Textarea } from '../components/ds'
import { IconBack } from '../components/ds/icons'

const TERMINAL_STATES = ['SesionCancelada', 'Cancelado']

export default function TutorProfile({ user }) {
  const { id } = useParams()
  const nav = useNavigate()
  const [tutor, setTutor] = useState(null)
  const [date, setDate] = useState('')
  const [subject, setSubject] = useState('')
  const [comment, setComment] = useState('')
  const [stars, setStars] = useState(5)
  const [bookingMsg, setBookingMsg] = useState(null)
  const [reviewMsg, setReviewMsg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [editComment, setEditComment] = useState('')
  const [editStars, setEditStars] = useState(5)
  const [deleteReviewId, setDeleteReviewId] = useState(null)

  useEffect(() => {
    setLoading(true)
    getTutorById(id)
      .then(t => {
        setTutor(t)
        const subs = t?.materias ? t.materias.map(m => m.descripcion || m) : (t?.subjects || [])
        setSubject(subs[0] || '')
      })
      .finally(() => setLoading(false))
  }, [id])

  async function onBook() {
    if (!user) return nav('/login')
    if (!date) { setBookingMsg({ tone: 'danger', text: 'Seleccioná una fecha y hora.' }); return }
    if (new Date(date).getTime() < Date.now()) {
      setBookingMsg({ tone: 'danger', text: 'No podés reservar una sesión en una fecha u horario anterior al actual.' })
      return
    }
    try {
      const isTutorUser = user.role === 'tutor'
      const existing = await getBookingsForUser(user.id, isTutorUser)
      const targetDate = new Date(date)
      const targetTime = targetDate.getTime()

      // Sesiones del mismo día (excluyendo las canceladas).
      const sameDaySessions = existing.filter(s => {
        const estado = s.estado || s.status
        if (TERMINAL_STATES.includes(estado)) return false
        return new Date(s.fechaInicio).toDateString() === targetDate.toDateString()
      })

      const hasConflict = sameDaySessions.some(s => new Date(s.fechaInicio).getTime() === targetTime)
      if (hasConflict) {
        setBookingMsg({ tone: 'danger', text: 'Ya tenés una reserva en ese día y horario.' })
        return
      }

      const MIN_GAP_MS = 3 * 60 * 60 * 1000
      const tooClose = sameDaySessions.some(s => Math.abs(new Date(s.fechaInicio).getTime() - targetTime) < MIN_GAP_MS)
      if (tooClose) {
        setBookingMsg({ tone: 'danger', text: 'Ya tenés una reserva muy cerca de ese horario. Elegí otro horario con al menos 3 horas de diferencia.' })
        return
      }

      const MAX_BOOKINGS_PER_DAY = 3
      if (sameDaySessions.length >= MAX_BOOKINGS_PER_DAY) {
        setBookingMsg({ tone: 'danger', text: 'Alcanzaste el máximo de 3 reservas para ese día.' })
        return
      }

      await createBooking({ tutor, user, date, subject })
      setBookingMsg({ tone: 'success', text: 'Reserva creada exitosamente.' })
      setTimeout(() => nav('/bookings'), 1200)
    } catch (e) {
      setBookingMsg({ tone: 'danger', text: 'Error al crear la reserva: ' + e.message })
    }
  }

  async function onReview() {
    if (!user) return nav('/login')
    if (!comment.trim()) { setReviewMsg({ tone: 'danger', text: 'Escribí un comentario.' }); return }
    try {
      const reviewerName = user.nombre
        ? `${user.nombre} ${user.apellido || ''}`.trim()
        : (user.name || user.email || 'Alumno')
      await addReview(id, { userId: user.id, user: reviewerName, stars: Number(stars), comment })
      setComment('')
      setReviewMsg({ tone: 'success', text: 'Reseña enviada.' })
      const updated = await getTutorById(id)
      setTutor(updated)
    } catch (e) {
      setReviewMsg({ tone: 'danger', text: 'Error al enviar reseña: ' + e.message })
    }
  }

  function startEditReview(r) {
    setEditingReviewId(r.id)
    setEditComment(r.comment || r.comentario || '')
    setEditStars(r.stars || r.puntaje || 5)
  }

  function cancelEditReview() {
    setEditingReviewId(null)
  }

  async function saveEditReview(reviewId) {
    if (!editComment.trim()) return
    editLocalReview(id, reviewId, { stars: editStars, comment: editComment })
    setEditingReviewId(null)
    const updated = await getTutorById(id)
    setTutor(updated)
  }

  function onDeleteReview(reviewId) {
    setDeleteReviewId(reviewId)
  }

  async function confirmDeleteReview() {
    const reviewId = deleteReviewId
    setDeleteReviewId(null)
    if (!reviewId) return
    deleteLocalReview(id, reviewId)
    const updated = await getTutorById(id)
    setTutor(updated)
  }

  if (loading) return <Page><p style={{ color: 'var(--text-muted)' }}>Cargando tutor...</p></Page>
  if (!tutor) return <Page><p style={{ color: 'var(--danger)' }}>Tutor no encontrado.</p></Page>

  // Normalizar campos — el backend devuelve nombre/apellido, el mock devuelve name
  const name = tutor.nombre ? `${tutor.nombre} ${tutor.apellido || ''}`.trim() : tutor.name
  const subjects = tutor.materias
    ? tutor.materias.map(m => m.descripcion || m)
    : (tutor.subjects || [])
  const rating = tutor.rating ?? 0
  const reviews = tutor.calificaciones || tutor.reviews || []
  const modality = tutor.ciudadesServicio ? tutor.ciudadesServicio.join(' · ') : tutor.modality
  const total = tutor.hourlyRate || 0

  return (
    <Page>
      <Link to="/tutors" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--space-5)' }}>
        <IconBack /> Volver a tutores
      </Link>

      {/* ── Header ──────────────────────────────────────────── */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Avatar name={name} size={84} />
          <div style={{ flex: '1 1 260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>{name}</h2>
              {tutor.achievements?.[0] && <Badge tone="gold">{tutor.achievements[0]}</Badge>}
            </div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <RatingStars value={rating} showValue />
              <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>({reviews.length} reseñas)</span>
              {modality && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>· {modality}</span>}
            </div>
            {tutor.bio && <p style={{ marginTop: 12, color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)' }}>{tutor.bio}</p>}
            {subjects.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {subjects.map((s, i) => <Tag key={i} tone={i === 0 ? 'brand' : 'neutral'}>{s}</Tag>)}
              </div>
            )}
          </div>
          {tutor.hourlyRate != null && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--fw-bold)' }}>${tutor.hourlyRate}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>por hora</div>
            </div>
          )}
        </div>
      </Card>

      {/* ── Reseñas + Reservar ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        <Card>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 14 }}>Reseñas ({reviews.length})</h3>

          {reviews.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Todavía no hay reseñas para este tutor.</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {reviews.map((r, i) => {
              const reviewer = r.user || (r.alumno ? `${r.alumno.nombre} ${r.alumno.apellido}` : 'Alumno')
              const isOwn = !!user && r.id?.startsWith?.('local-review-') && String(r.userId) === String(user.id)
              const isEditing = editingReviewId === r.id

              return (
                <div key={r.id || i} style={{ display: 'flex', gap: 12, paddingBottom: 14, borderBottom: i < reviews.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                  <Avatar name={reviewer} size={36} shape="circle" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <strong style={{ fontSize: 'var(--text-sm)' }}>{reviewer}</strong>
                      {isEditing
                        ? <RatingStars value={editStars} onChange={setEditStars} size={14} />
                        : <RatingStars value={r.stars || r.puntaje || 0} size={14} />}
                    </div>
                    {isEditing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                        <Textarea value={editComment} onChange={e => setEditComment(e.target.value)} rows={2} />
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Button size="sm" onClick={() => saveEditReview(r.id)}>Guardar</Button>
                          <Button size="sm" variant="secondary" onClick={cancelEditReview}>Cancelar</Button>
                        </div>
                      </div>
                    ) : (
                      <p style={{ marginTop: 4, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{r.comment || r.comentario}</p>
                    )}
                    {isOwn && !isEditing && (
                      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                        <button onClick={() => startEditReview(r)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--brand)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', cursor: 'pointer' }}>Editar</button>
                        <button onClick={() => onDeleteReview(r.id)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--danger)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', cursor: 'pointer' }}>Eliminar</button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <h4 style={{ marginTop: 'var(--space-6)', marginBottom: 10, fontSize: 'var(--text-base)' }}>Dejá tu reseña</h4>
          {!user && (
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              <Link to="/login">Iniciá sesión</Link> para dejar una reseña.
            </p>
          )}
          {user && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <RatingStars value={stars} onChange={setStars} size={22} />
              <Textarea
                placeholder="Contá tu experiencia con este tutor..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
              />
              <div>
                <Button onClick={onReview}>Enviar reseña</Button>
              </div>
              {reviewMsg && <Alert tone={reviewMsg.tone}>{reviewMsg.text}</Alert>}
            </div>
          )}
        </Card>

        <Card style={{ position: 'sticky', top: 'calc(var(--nav-height) + 16px)' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 14 }}>Reservar sesión</h3>
          {subjects.length > 0 && (
            <Select
              label="Materia"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              options={subjects.map(s => ({ value: s, label: s }))}
              style={{ marginBottom: 14 }}
            />
          )}
          <Input
            label="Fecha y hora"
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          {tutor.hourlyRate != null && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--divider)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total estimado</span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}>${total}</strong>
            </div>
          )}
          <Button fullWidth onClick={onBook} style={{ marginTop: 16 }}>Reservar sesión</Button>
          {bookingMsg && <Alert tone={bookingMsg.tone} style={{ marginTop: 12 }}>{bookingMsg.text}</Alert>}
        </Card>
      </div>

      <Modal
        open={deleteReviewId != null}
        title="¿Eliminar esta reseña?"
        onClose={() => setDeleteReviewId(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteReviewId(null)}>Volver</Button>
            <Button variant="danger" onClick={confirmDeleteReview}>Eliminar reseña</Button>
          </>
        }
      >
        Esta acción eliminará tu reseña de forma permanente.
      </Modal>
    </Page>
  )
}