import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TutorCard as DSTutorCard } from './ds'

export default function TutorCard({ tutor }) {
  const nav = useNavigate()

  // Normalizar campos — backend devuelve nombre/apellido, mock devuelve name
  const name = tutor.nombre
    ? `${tutor.nombre} ${tutor.apellido || ''}`.trim()
    : (tutor.name || '?')

  const subjects = tutor.materias
    ? tutor.materias.map(m => m.descripcion || m)
    : (tutor.subjects || [])

  const modality = tutor.ciudadesServicio
    ? tutor.ciudadesServicio.join(' · ')
    : (tutor.modality || '')

  const reviewCount = tutor.calificaciones
    ? tutor.calificaciones.length
    : (tutor.reviewCount ?? (tutor.reviews ? tutor.reviews.length : undefined))

  return (
    <DSTutorCard
      name={name}
      subjects={subjects}
      rating={tutor.rating ?? 0}
      reviewCount={reviewCount}
      modality={modality}
      hourlyRate={tutor.hourlyRate}
      highlight={tutor.achievements?.[0]}
      onView={() => nav(`/tutors/${tutor.id}`)}
    />
  )
}