import React from 'react'
import { Link } from 'react-router-dom'

export default function TutorCard({ tutor }) {
  const initials = tutor.name.split(' ').map(s=>s[0]).slice(0,2).join('')
  return (
    <div className="tutor-card">
      <div className="tutor-head">
        <div className="avatar">{initials}</div>
        <div>
          <h3 className="tutor-name">{tutor.name} <span className="rating">{tutor.rating}★</span></h3>
          <div className="tutor-meta">{tutor.modality} • {tutor.subjects[0]}</div>
        </div>
        <div className="price-pill">${tutor.hourlyRate}/h</div>
      </div>

      <div className="subjects"><strong>Materias:</strong> {tutor.subjects.join(', ')}</div>
      <p className="tutor-bio" style={{marginTop:10,color:'var(--muted)'}}>{tutor.bio}</p>

      <Link className="profile-link" to={`/tutors/${tutor.id}`}>Ver perfil →</Link>
    </div>
  )
}
