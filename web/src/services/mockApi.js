/**
 * mockApi.js — fallback con datos locales cuando el backend no está disponible
 * o devuelve datos incompletos.
 * Las funciones intentan primero el backend real (api.js) y caen aquí si falla.
 */
import { tutors, users } from '../mock/mockData'
import * as api from './api'

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

// Mínimo de tutores que esperamos del backend antes de completar con datos mock.
const MIN_TUTORS = 9

// Sesiones/reservas creadas localmente cuando el backend no está disponible,
// persistidas en localStorage para sobrevivir a un refresh de la página.
const SESSIONS_STORAGE_KEY = 'uadem_local_sessions'

function loadMockSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveMockSessions() {
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(mockSessions))
  } catch {
    /* ignore */
  }
}

const mockSessions = loadMockSessions()

// Reseñas creadas localmente, agrupadas por id de tutor y persistidas en
// localStorage para sobrevivir a un refresh de la página.
const REVIEWS_STORAGE_KEY = 'uadem_local_reviews'

function loadLocalReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveLocalReviews() {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(localReviews))
  } catch {
    /* ignore */
  }
}

const localReviews = loadLocalReviews()

/** Devuelve una copia del tutor con sus reseñas locales y rating recalculado. */
function withLocalReviews(t) {
  if (!t) return t
  const extra = localReviews[String(t.id)] || []
  if (extra.length === 0) return t
  if (t.calificaciones) {
    const all = [...t.calificaciones, ...extra]
    const avg = all.reduce((s, r) => s + (r.stars || r.puntaje || 0), 0) / all.length
    return { ...t, calificaciones: all, rating: Math.round(avg * 10) / 10 }
  }
  const all = [...(t.reviews || []), ...extra]
  const avg = all.reduce((s, r) => s + (r.stars || r.puntaje || 0), 0) / all.length
  return { ...t, reviews: all, rating: Math.round(avg * 10) / 10 }
}

/**
 * Tutores del backend sin datos suficientes para mostrarse (sin precio/hora ni
 * rating, p. ej. los tutores demo de `DataInitializer`) se descartan de los
 * listados del frontend, aunque se mantengan en el backend para los logins demo.
 */
function hasCompleteData(t) {
  return (t.hourlyRate || 0) > 0
}

/** Completa una lista de tutores del backend con tutores mock si está vacía o es muy corta. */
export function fillWithMockTutors(list) {
  const base = (Array.isArray(list) ? list : []).filter(hasCompleteData)
  if (base.length >= MIN_TUTORS) return base
  const existingIds = new Set(base.map(t => String(t.id)))
  const extra = tutors.filter(t => !existingIds.has(String(t.id)))
  return [...base, ...extra]
}

export async function getTutors() {
  try {
    const data = await api.getTutores()
    return fillWithMockTutors(data)
  } catch {
    await delay()
    return tutors
  }
}

export async function getTutorById(id) {
  try {
    const data = await api.getTutorById(id)
    if (data) return withLocalReviews(data)
  } catch {
    /* fall through to mock */
  }
  await delay()
  return withLocalReviews(tutors.find(t => String(t.id) === String(id)) || null)
}

export async function searchTutors(q) {
  try {
    const data = q ? await api.buscarTutores(q) : await api.getTutores()
    return fillWithMockTutors(data)
  } catch {
    await delay()
    if (!q) return tutors
    const s = q.toLowerCase()
    return tutors.filter(t =>
      t.name.toLowerCase().includes(s) ||
      (t.subjects || []).join(' ').toLowerCase().includes(s)
    )
  }
}

/** Construye una sesión con la misma forma que devuelve el backend (SesionMentoria). */
function buildMockSession({ tutor, user, date, subject }) {
  const tutorNombre = tutor.nombre || (tutor.name || '').split(' ')[0] || 'Tutor'
  const tutorApellido = tutor.apellido ?? (tutor.name || '').split(' ').slice(1).join(' ')
  const alumnoNombre = user.nombre || user.name || (user.email || 'Alumno').split('@')[0]
  const alumnoApellido = user.apellido ?? ''
  const subjects = tutor.materias
    ? tutor.materias.map(m => m.descripcion || m)
    : (tutor.subjects || [])
  const materia = subject || subjects[0]

  return {
    id: `local-${Date.now()}`,
    fechaInicio: date,
    fechaFin: date,
    total: tutor.hourlyRate || 0,
    estado: 'Reservado',
    tutor: { id: tutor.id, nombre: tutorNombre, apellido: tutorApellido },
    alumno: { id: user.id, nombre: alumnoNombre, apellido: alumnoApellido },
    materia: materia ? { descripcion: materia } : null,
  }
}

/**
 * Crea una reserva/sesión de mentoría.
 * Usa el mismo endpoint (`/sesiones-mentoria`) que `getSesionesByAlumno`/`getSesionesByTutor`
 * leen, para que la nueva reserva aparezca de inmediato en "Mis Reservas".
 */
export async function createBooking({ tutor, user, date, subject }) {
  const fechaInicio = new Date(date)
  const fechaFin = new Date(fechaInicio.getTime() + 60 * 60 * 1000)

  try {
    return await api.crearSesion({
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString(),
      comisionDePlataforma: 0,
      anticipo: 0,
      total: tutor.hourlyRate || 0,
      tutorId: Number(tutor.id),
      alumnoId: Number(user.id),
    })
  } catch {
    await delay()
    const session = buildMockSession({ tutor, user, date, subject })
    mockSessions.unshift(session)
    saveMockSessions()
    return session
  }
}

/**
 * Lista las reservas/sesiones de un usuario. `isTutor` determina si se busca
 * por `tutorId` o `alumnoId`. Combina el resultado del backend con las
 * reservas creadas localmente (`mockSessions`), ya que las reservas a
 * tutores del catálogo mock siempre se guardan localmente.
 */
export async function getBookingsForUser(userId, isTutor = false) {
  let backendList = []
  try {
    backendList = (isTutor
      ? await api.getSesionesByTutor(userId)
      : await api.getSesionesByAlumno(userId)) || []
  } catch {
    backendList = []
  }

  const key = isTutor ? 'tutor' : 'alumno'
  const localList = mockSessions.filter(s => s[key] && String(s[key].id) === String(userId))

  return [...localList, ...backendList]
}

/** Cancela localmente una reserva creada en `mockSessions` (id `local-...`). */
export function cancelLocalSession(id) {
  const session = mockSessions.find(s => s.id === id)
  if (session) {
    session.estado = 'SesionCancelada'
    saveMockSessions()
  }
  return session
}

export async function loginMock(email) {
  await delay()
  return users.find(u => u.email === email) || null
}

export async function addReview(tutorId, review) {
  try {
    return await api.generarCalificacion({
      tutorId: Number(tutorId),
      alumnoId: review.userId || null,
      puntaje: review.stars || 5,
      comentario: review.comment || '',
    })
  } catch {
    await delay()
    const key = String(tutorId)
    const entry = {
      id: `local-review-${Date.now()}`,
      userId: review.userId,
      user: review.user,
      stars: Number(review.stars) || 5,
      comment: review.comment || '',
    }
    const list = localReviews[key] || (localReviews[key] = [])
    list.push(entry)
    saveLocalReviews()
    return entry
  }
}

/** Edita una reseña local (id `local-review-...`) del tutor indicado. */
export function editLocalReview(tutorId, reviewId, { stars, comment }) {
  const list = localReviews[String(tutorId)] || []
  const review = list.find(r => r.id === reviewId)
  if (review) {
    review.stars = Number(stars) || review.stars
    review.comment = comment
    saveLocalReviews()
  }
  return review
}

/** Elimina una reseña local (id `local-review-...`) del tutor indicado. */
export function deleteLocalReview(tutorId, reviewId) {
  const list = localReviews[String(tutorId)] || []
  const idx = list.findIndex(r => r.id === reviewId)
  if (idx >= 0) {
    list.splice(idx, 1)
    saveLocalReviews()
    return true
  }
  return false
}
