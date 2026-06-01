/**
 * api.js — cliente HTTP real contra el backend Spring Boot.
 * Maneja JWT automáticamente: lo guarda en localStorage y lo adjunta
 * en cada request como Bearer token.
 *
 * Fallback a mockApi cuando el backend no está disponible.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// ── Token helpers ────────────────────────────────────────────────────────────

export function saveToken(token) {
  localStorage.setItem('jwt_token', token)
}

export function getToken() {
  return localStorage.getItem('jwt_token')
}

export function removeToken() {
  localStorage.removeItem('jwt_token')
  localStorage.removeItem('current_user')
}

export function saveUser(user) {
  localStorage.setItem('current_user', JSON.stringify(user))
}

export function loadUser() {
  try {
    const raw = localStorage.getItem('current_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// ── Base fetch con JWT ───────────────────────────────────────────────────────

async function apiFetch(path, opts = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opts.headers || {}),
  }
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`${res.status} ${text}`)
  }
  // 204 No Content
  if (res.status === 204) return null
  return res.json()
}

// ── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Login real contra /api/v1/auth/authenticate
 * Devuelve el objeto usuario con { id, nombre, apellido, email, role }
 * o lanza error si las credenciales son incorrectas.
 */
export async function login(email, password) {
  const data = await apiFetch('/api/v1/auth/authenticate', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  saveToken(data.accessToken)

  // Decodificar el JWT para obtener info básica del usuario
  const payload = parseJwt(data.accessToken)
  const user = {
    email: payload.sub,
    role: payload.role || detectRole(payload),
    nombre: payload.nombre || email.split('@')[0],
    apellido: payload.apellido || '',
    id: payload.id || null,
  }
  saveUser(user)
  return user
}

/**
 * Registro real contra /api/v1/auth/register
 */
export async function register({ nombre, apellido, dni, email, pass, telefono, role }) {
  const data = await apiFetch('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, apellido, dni, email, pass, telefono, role }),
  })
  saveToken(data.accessToken)
  const payload = parseJwt(data.accessToken)
  const user = {
    email: payload.sub,
    role: role,
    nombre,
    apellido,
    id: payload.id || null,
  }
  saveUser(user)
  return user
}

export function logout() {
  removeToken()
}

// ── Tutores ──────────────────────────────────────────────────────────────────

export async function getTutores() {
  return apiFetch('/tutores')
}

export async function getTutorById(id) {
  return apiFetch(`/tutores/${id}`)
}

export async function buscarTutores(nombre, apellido = '') {
  return apiFetch(`/tutores/buscar?nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}`)
}

// ── Sesiones ─────────────────────────────────────────────────────────────────

export async function getSesionesByAlumno(alumnoId) {
  return apiFetch(`/sesiones-mentoria?alumnoId=${alumnoId}`)
}

export async function getSesionesByTutor(tutorId) {
  return apiFetch(`/sesiones-mentoria?tutorId=${tutorId}`)
}

export async function crearSesion(payload) {
  return apiFetch('/sesiones-mentoria', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function cancelarSesion(id) {
  return apiFetch(`/sesiones-mentoria/${id}/cancelar`, { method: 'PUT' })
}

// ── Reservas ─────────────────────────────────────────────────────────────────

export async function getReservas() {
  return apiFetch('/api/reservas')
}

export async function crearReserva({ alumnoId, tutorId, fechaHora }) {
  return apiFetch('/api/reservas', {
    method: 'POST',
    body: JSON.stringify({ alumnoId, tutorId, fechaHora }),
  })
}

// ── Calificaciones ───────────────────────────────────────────────────────────

export async function generarCalificacion({ tutorId, alumnoId, puntaje, comentario }) {
  return apiFetch('/usuarios/generarCalificacion', {
    method: 'POST',
    body: JSON.stringify({ tutorId, alumnoId, puntaje, comentario }),
  })
}

export async function getCalificacionesTutor(tutorId) {
  return apiFetch(`/usuarios/CalificacionesTutor/${tutorId}`)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return {}
  }
}

function detectRole(payload) {
  // Spring Security pone authorities como array de strings
  const auths = payload.authorities || payload.roles || []
  if (auths.includes('ROLE_TUTOR')) return 'tutor'
  if (auths.includes('ROLE_ALUMNO')) return 'alumno'
  return 'alumno'
}
