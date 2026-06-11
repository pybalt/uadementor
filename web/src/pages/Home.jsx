import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Page, SectionTitle } from '../components/ds'
import { IconSearch, IconCalendar, IconStar } from '../components/ds/icons'
import TutorCard from '../components/TutorCard'
import { getTutors } from '../services/mockApi'

const STEPS_ALUMNO = [
  { Icon: IconSearch, title: '1. Buscá un tutor', text: 'Filtrá por materia, modalidad y precio para encontrar al mentor ideal.' },
  { Icon: IconCalendar, title: '2. Reservá una sesión', text: 'Elegí día y horario, y coordiná tu clase en pocos clics.' },
  { Icon: IconStar, title: '3. Calificá tu experiencia', text: 'Dejá una reseña para ayudar a otros estudiantes a elegir mejor.' },
]

const STEPS_TUTOR = [
  { Icon: IconCalendar, title: '1. Recibí solicitudes', text: 'Los alumnos reservan sesiones según tu disponibilidad y materias.' },
  { Icon: IconSearch, title: '2. Aceptá y dictá la clase', text: 'Confirmá la sesión y brindá tu mentoría académica.' },
  { Icon: IconStar, title: '3. Sumá reseñas y logros', text: 'Generá reputación y desbloqueá logros a medida que ayudás a más alumnos.' },
]

export default function Home({ user }) {
  const nav = useNavigate()
  const isTutor = user?.role === 'tutor'
  const [tutors, setTutors] = useState([])

  useEffect(() => {
    if (isTutor) return
    getTutors().then(list => setTutors((list || []).slice(0, 3))).catch(() => setTutors([]))
  }, [isTutor])

  const steps = isTutor ? STEPS_TUTOR : STEPS_ALUMNO

  return (
    <Page>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-full" style={{
        background: 'linear-gradient(160deg, var(--blue-700), var(--blue-900))',
        color: '#fff', boxShadow: 'var(--shadow-xl)',
      }}>
        <div style={{
          maxWidth: 'var(--container)', margin: '0 auto', padding: '56px var(--space-6)',
          display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ flex: '1 1 360px', maxWidth: 580 }}>
            <div className="ds-eyebrow" style={{ color: 'var(--sky-300)' }}>UADE MENTOR</div>
            <h1 style={{ fontSize: 'var(--text-5xl)', color: '#fff', marginTop: 10 }}>
              {isTutor ? 'Gestioná tus mentorías académicas' : 'Encontrá tutores que te inspiren'}
            </h1>
            <p style={{ color: 'var(--text-on-dark)', marginTop: 16, fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)' }}>
              {isTutor
                ? 'Revisá tus reservas de alumnos, aceptá solicitudes de clases y hacé seguimiento del historial académico desde un solo lugar.'
                : 'Conectá con mentores verificados, reservá sesiones por hora y mejorá tus resultados académicos con apoyo personalizado.'}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              {isTutor ? (
                <>
                  <Button size="lg" onClick={() => nav('/bookings')}>Mis Tutorías</Button>
                  <Button size="lg" variant="secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }} onClick={() => nav('/profile')}>Mi Perfil</Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={() => nav('/tutors')}>Buscar Tutores</Button>
                  <Button size="lg" variant="secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }} onClick={() => nav('/bookings')}>Mis Reservas</Button>
                </>
              )}
            </div>
          </div>

          {!isTutor && tutors[0] && (
            <div className="hero-tutor-card" style={{ width: 'min(100%, 340px)' }}>
              <TutorCard tutor={tutors[0]} />
            </div>
          )}
        </div>
      </section>

      {/* ── Cómo funciona ────────────────────────────────────── */}
      <div>
        <SectionTitle eyebrow="Cómo funciona" title={isTutor ? 'Tu mentoría, paso a paso' : 'Empezá en tres pasos'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
          {steps.map(({ Icon, title, text }) => (
            <Card key={title}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                background: 'var(--brand-subtle)', color: 'var(--brand)', marginBottom: 14,
              }}>
                <Icon />
              </span>
              <h3 style={{ fontSize: 'var(--text-lg)' }}>{title}</h3>
              <p style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{text}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Tutores destacados (alumno) ───────────────────────── */}
      {!isTutor && tutors.length > 0 && (
        <div style={{ marginTop: 'var(--space-9)' }}>
          <SectionTitle eyebrow="Destacados" title="Tutores destacados" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
            {tutors.map(t => <TutorCard key={t.id} tutor={t} />)}
          </div>
        </div>
      )}
    </Page>
  )
}