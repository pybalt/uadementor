import { tutors, users, bookings } from '../mock/mockData'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function fetchJson(path, opts) {
  try {
    const res = await fetch(`${API_BASE}${path}`, opts)
    if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`)
    return await res.json()
  } catch (err) {
    console.warn('API request failed, falling back to mock:', err)
    throw err
  }
}

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export async function getTutors() {
  try {
    return await fetchJson('/tutores')
  } catch {
    await delay()
    return tutors
  }
}

export async function getTutorById(id) {
  try {
    return await fetchJson(`/tutores/${id}`)
  } catch {
    await delay()
    return tutors.find(t => t.id === id)
  }
}

export async function searchTutors(q) {
  try {
    // backend has a buscar endpoint that expects nombre+apellido; we fetch all and filter client-side
    const list = await fetchJson('/tutores')
    if (!q) return list
    const s = q.toLowerCase()
    return list.filter(t => (t.name || '').toLowerCase().includes(s) || (t.subjects || []).join(' ').toLowerCase().includes(s))
  } catch {
    await delay()
    if (!q) return tutors
    const s = q.toLowerCase()
    return tutors.filter(t => t.name.toLowerCase().includes(s) || t.subjects.join(' ').toLowerCase().includes(s))
  }
}

export async function getBookingsForUser(userId) {
  try {
    const reservas = await fetchJson('/api/reservas')
    return reservas.filter(r => r.alumno && r.alumno.id === userId)
  } catch {
    await delay()
    return bookings.filter(b => b.userId === userId)
  }
}

export async function createBooking({ tutorId, userId, date }) {
  try {
    // backend expects CrearReservaDTO: { alumnoId, tutorId, fechaHora }
    const body = { alumnoId: userId, tutorId, fechaHora: date }
    return await fetchJson('/api/reservas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  } catch {
    await delay()
    const b = { id: 'b' + (bookings.length + 1), tutorId, userId, date, status: 'Pendiente' }
    bookings.push(b)
    return b
  }
}

export async function loginMock(email) {
  await delay()
  return users.find(u => u.email === email) || null
}

export async function addReview(tutorId, review) {
  try {
    const body = { tutorId, alumnoId: review.userId || null, puntaje: review.stars || 5, comentario: review.comment || '' }
    return await fetchJson('/usuarios/generarCalificacion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  } catch {
    await delay()
    const t = tutors.find(x => x.id === tutorId)
    if (!t) throw new Error('Tutor not found')
    t.reviews.push(review)
    t.rating = Math.round((t.reviews.reduce((s, r) => s + r.stars, 0) / t.reviews.length) * 10) / 10
    return review
  }
}
