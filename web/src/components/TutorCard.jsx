import React from 'react'
import { Link } from 'react-router-dom'

export default function TutorCard({ tutor }) {
  // Normalizar campos — backend devuelve nombre/apellido, mock devuelve name
  const nombre = tutor.nombre
    ? `${tutor.nombre} ${tutor.apellido || ''}`.trim()
    : (tutor.name || '?')

  const initials = nombre.split(' ').map(s => s[0]).slice(0, 2).join('')

  const materias = tutor.materias
    ? tutor.materias.map(m => m.descripcion || m).join(', ')
    : (tutor.subjects || []).join(', ')

  const rating = tutor.rating ?? '—'
  const precio = tutor.hourlyRate ? `$${tutor.hourlyRate}/h` : ''
  const modalidad = tutor.ciudadesServicio
    ? tutor.ciudadesServicio.join(' · ')
    : (tutor.modality || '')

  return (
    <div className="tutor-card">
      <div className="tutor-head">
        <div className="avatar">{initials}</div>
        <div>
          <h3 className="tutor-name">
            {nombre} <span className="rating">{rating}★</span>
          </h3>
          <div className="tutor-meta">{modalidad}</div>
        </div>
        {precio && <div className="price-pill">{precio}</div>}
      </div>

      <div className="subjects"><strong>Materias:</strong> {materias || '—'}</div>
      {tutor.bio && (
        <p className="tutor-bio" style={{ marginTop: 10, color: 'var(--muted)' }}>
          {tutor.bio}
        </p>
      )}

      <Link className="profile-link" to={`/tutors/${tutor.id}`}>Ver perfil →</Link>
    </div>
  )
}
