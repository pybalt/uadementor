import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ user }){
  const isTutor = user && user.role === 'tutor'

  if (isTutor) {
    return (
      <div>
        <section className="hero">
          <div className="left">
            <h2>Gestiona tus mentorías académicas</h2>
            <p>Encuentra tus reservas de alumnos, acepta solicitudes de clases, y haz el seguimiento del historial académico.</p>
            <div className="cta">
              <Link to="/bookings" className="btn btn-primary">Mis Tutorías</Link>
              <Link to="/profile" className="btn btn-ghost">Mi Perfil</Link>
            </div>
          </div>
        </section>

        <div style={{marginTop:16}}>
          <h3 style={{margin:'8px 0 6px 0'}}>Cómo funciona (como Mentor)</h3>
          <p style={{color:'var(--muted)'}}>Configura tus materias y disponibilidad, y gestiona las solicitudes de los alumnos para ayudarlos a superar sus desafíos académicos.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="hero">
        <div className="left">
          <h2>Encuentra tutores que te inspiren</h2>
          <p>Conecta con mentores verificados, reserva sesiones por hora y mejora tus resultados académicos con apoyo personalizado.</p>
          <div className="cta">
            <Link to="/tutors" className="btn btn-primary">Buscar Tutores</Link>
            <Link to="/bookings" className="btn btn-ghost">Mis Reservas</Link>
          </div>
        </div>
      </section>

      <div style={{marginTop:16}}>
        <h3 style={{margin:'8px 0 6px 0'}}>Cómo funciona</h3>
        <p style={{color:'var(--muted)'}}>Explora tutores por materia, modalidad y disponibilidad. Reserva, asiste y puntúa para ayudar a otros estudiantes.</p>
      </div>
    </div>
  )
}
