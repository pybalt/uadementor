import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { logout, getSesionesByAlumno } from '../services/api'
import { getBookingsForUser } from '../services/mockApi'
import { AchievementBadge, Avatar, Badge, Button, Card, Page, SectionTitle, StatCard } from '../components/ds'

export default function Profile({ user, onLogout }) {
  const nav = useNavigate()
  const [sesiones, setSesiones] = useState([])

  useEffect(() => {
    if (!user?.id) return
    getSesionesByAlumno(user.id)
      .then(setSesiones)
      .catch(() => getBookingsForUser(user.id).then(setSesiones))
  }, [user])

  function handleLogout() {
    logout()
    onLogout()
    nav('/')
  }

  if (!user) return (
    <Page>
      <p><Link to="/login">Iniciá sesión</Link> para ver tu perfil.</p>
    </Page>
  )

  const nombre = user.nombre || user.name || user.email
  const isTutor = user.role === 'tutor'
  const rol = isTutor ? 'Tutor' : 'Alumno'
  const completadas = sesiones.filter(s => s.estado === 'Concretado').length
  const pendientes = sesiones.filter(s => !['Concretado', 'SesionCancelada', 'Cancelado'].includes(s.estado)).length

  return (
    <Page>
      <SectionTitle title="Mi Perfil" />

      <Card style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
        <Avatar name={`${nombre} ${user.apellido || ''}`} size={72} shape="circle" />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 'var(--text-2xl)' }}>{nombre} {user.apellido || ''}</h2>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Badge tone="brand">{rol}</Badge>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{user.email}</span>
          </div>
        </div>
        <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-7)' }}>
        <StatCard label="Sesiones totales" value={sesiones.length} tone="brand" />
        <StatCard label="Completadas" value={completadas} tone="success" />
        <StatCard label="Pendientes" value={pendientes} tone="gold" />
      </div>

      {!isTutor && (
        <>
          <SectionTitle title="Logros" sub="Desbloqueás logros al completar sesiones y calificar a tus tutores." />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <AchievementBadge label="Primera Reserva" icon="spark" locked={sesiones.length < 1} />
            <AchievementBadge label="Alumno Comprometido" icon="medal" locked={completadas < 1} />
            <AchievementBadge label="Alumno Dedicado" icon="trophy" locked={completadas < 3} />
          </div>
        </>
      )}
    </Page>
  )
}