/**
 * mockApi.js — fallback con datos locales cuando el backend no está disponible.
 * Las funciones intentan primero el backend real (api.js) y caen aquí si falla.
 */
import { tutors, users, bookings } from '../mock/mockData'
import * as api from './api'

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export async function getTutors() {
  try {
    return await api.getTutores()
  } catch {
    await delay()
    return tutors
  }
}

export async function getTutorById(id) {
  try {
    return await api.getTutorById(id)
  } catch {
    await delay()
    // id puede ser numérico (backend) o string mock ('t1')
    return tutors.find(t => String(t.id) === String(id)) || null
  }
}

export async function searchTutors(q) {
  try {
    if (!q) return await api.getTutores()
    return await api.buscarTutores(q)
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

export async function getBookingsForUser(userId) {
  try {
    return await api.getSesionesByAlumno(userId)
  } catch {
    await delay()
    return bookings.filter(b => b.userId === userId)
  }
}

export async function createBooking({ tutorId, userId, date }) {
  try {
    return await api.crearReserva({ alumnoId: userId, tutorId, fechaHora: date })
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
    return await api.generarCalificacion({
      tutorId: Number(tutorId),
      alumnoId: review.userId || null,
      puntaje: review.stars || 5,
      comentario: review.comment || '',
    })
  } catch {
    await delay()
    const t = tutors.find(x => String(x.id) === String(tutorId))
    if (!t) throw new Error('Tutor not found')
    t.reviews = t.reviews || []
    t.reviews.push(review)
    t.rating = Math.round(
      (t.reviews.reduce((s, r) => s + r.stars, 0) / t.reviews.length) * 10
    ) / 10
    return review
  }
}
