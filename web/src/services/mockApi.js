import { tutors, users, bookings } from '../mock/mockData'

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))

export async function getTutors() {
  await delay()
  return tutors
}

export async function getTutorById(id) {
  await delay()
  return tutors.find(t => t.id === id)
}

export async function searchTutors(q) {
  await delay()
  if (!q) return tutors
  const s = q.toLowerCase()
  return tutors.filter(t => t.name.toLowerCase().includes(s) || t.subjects.join(' ').toLowerCase().includes(s))
}

export async function getBookingsForUser(userId) {
  await delay()
  return bookings.filter(b => b.userId === userId)
}

export async function createBooking({ tutorId, userId, date }) {
  await delay()
  const b = { id: 'b' + (bookings.length + 1), tutorId, userId, date, status: 'Pendiente' }
  bookings.push(b)
  return b
}

export async function loginMock(email) {
  await delay()
  return users.find(u => u.email === email) || null
}

export async function addReview(tutorId, review) {
  await delay()
  const t = tutors.find(x => x.id === tutorId)
  if (!t) throw new Error('Tutor not found')
  t.reviews.push(review)
  // update rating (simple average)
  t.rating = Math.round((t.reviews.reduce((s, r) => s + r.stars, 0) / t.reviews.length) * 10) / 10
  return review
}
