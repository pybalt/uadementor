import React from 'react'
import { Link } from 'react-router-dom'

export default function TutorCard({ tutor }) {
  return (
    <div className="tutor-card">
      <h3>{tutor.name} <small style={{color:'#666',fontSize:12}}>({tutor.rating}★)</small></h3>
      <p style={{margin:6}}>{tutor.bio}</p>
      <p style={{margin:6,fontSize:13}}><strong>Materias:</strong> {tutor.subjects.join(', ')}</p>
      <p style={{margin:6,fontSize:13}}><strong>Modalidad:</strong> {tutor.modality} • ${tutor.hourlyRate}</p>
      <Link to={`/tutors/${tutor.id}`}>Ver perfil</Link>
    </div>
  )
}
