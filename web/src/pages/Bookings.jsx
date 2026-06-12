import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  cancelarSesion,
  aceptarSesion,
  concretarSesion,
} from '../services/api'
import { getBookingsForUser, cancelLocalSession, deleteLocalSession } from '../services/mockApi'
import { Alert, Avatar, Badge, Button, Card, Modal, Page, SectionTitle, StatusPill, Tabs } from '../components/ds'
import { IconCalendar } from '../components/ds/icons'

const TERMINAL = ['SesionCancelada', 'Cancelado', 'Concretado']

const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/** Formatea una fecha ISO como "13 de jun de 2026 · 18:00". */
function formatFechaHora(value) {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return null
  const day = d.getDate()
  const month = MONTHS_SHORT[d.getMonth()]
  const year = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${day} de ${month} de ${year} · ${hh}:${mm}`
}

export default function Bookings({ user }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const [tab, setTab] = useState('todas')
  const [cancelTarget, setCancelTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const isTutor = user && user.role === 'tutor'

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getBookingsForUser(user.id, isTutor)
      .then(setList)
      .finally(() => setLoading(false))
  }, [user, isTutor])

  function onCancelar(id) {
    setCancelTarget(id)
  }

  async function confirmCancelar() {
    const id = cancelTarget
    setCancelTarget(null)
    if (id == null) return
    try {
      if (String(id).startsWith('local-')) {
        cancelLocalSession(id)
      } else {
        await cancelarSesion(id)
      }
      setMsg({ tone: 'success', text: 'Sesión cancelada.' })
      setList(l => l.map(s => s.id === id ? { ...s, estado: 'SesionCancelada' } : s))
    } catch (e) {
      setMsg({ tone: 'danger', text: 'Error al cancelar: ' + e.message })
    }
  }

  function onEliminar(id) {
    setDeleteTarget(id)
  }

  function confirmEliminar() {
    const id = deleteTarget
    setDeleteTarget(null)
    if (id == null) return
    if (String(id).startsWith('local-')) {
      deleteLocalSession(id)
    }
    setList(l => l.filter(s => s.id !== id))
    setMsg({ tone: 'success', text: 'Reserva eliminada del historial.' })
  }

  async function onAceptar(id) {
    try {
      await aceptarSesion(id)
      setMsg({ tone: 'success', text: 'Sesión aceptada exitosamente.' })
      setList(l => l.map(s => s.id === id ? { ...s, estado: 'Aceptado' } : s))
    } catch (e) {
      setMsg({ tone: 'danger', text: 'Error al aceptar: ' + e.message })
    }
  }

  async function onConcretar(id) {
    try {
      await concretarSesion(id)
      setMsg({ tone: 'success', text: 'Sesión marcada como concretada.' })
      setList(l => l.map(s => s.id === id ? { ...s, estado: 'Concretado' } : s))
    } catch (e) {
      setMsg({ tone: 'danger', text: 'Error al concretar: ' + e.message })
    }
  }

  const filtered = useMemo(() => {
    if (tab === 'activas') return list.filter(s => !TERMINAL.includes(s.estado || s.status))
    if (tab === 'historial') return list.filter(s => TERMINAL.includes(s.estado || s.status))
    return list
  }, [list, tab])

  if (!user) return (
    <Page>
      <p>Necesitás <Link to="/login">iniciar sesión</Link> para ver tus reservas.</p>
    </Page>
  )

  const activas = list.filter(s => !TERMINAL.includes(s.estado || s.status)).length
  const historial = list.filter(s => TERMINAL.includes(s.estado || s.status)).length

  return (
    <Page>
      <SectionTitle
        eyebrow={isTutor ? 'Mentor' : undefined}
        title={isTutor ? 'Mis Tutorías' : 'Mis Reservas'}
        sub={isTutor ? 'Gestioná las solicitudes de tus alumnos.' : 'Seguí el estado de tus sesiones reservadas.'}
      />

      {msg && <Alert tone={msg.tone} style={{ marginBottom: 'var(--space-4)' }}>{msg.text}</Alert>}

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'todas', label: 'Todas', count: list.length },
          { value: 'activas', label: 'Activas', count: activas },
          { value: 'historial', label: 'Historial', count: historial },
        ]}
        style={{ marginBottom: 'var(--space-5)' }}
      />

      {loading && <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>}

      {!loading && filtered.length === 0 && (
        <p style={{ color: 'var(--text-muted)' }}>
          {isTutor ? 'No tenés tutorías en esta categoría.' : (
            <>No tenés reservas en esta categoría. <Link to="/tutors">Buscá un tutor</Link></>
          )}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((s, i) => {
          const estado = s.estado || s.status || 'Pendiente'

          const oppositePartyName = isTutor
            ? (s.alumno ? `${s.alumno.nombre} ${s.alumno.apellido}` : `Alumno #${s.alumnoId || '—'}`)
            : (s.tutor ? `${s.tutor.nombre} ${s.tutor.apellido}` : `Tutor #${s.tutorId || '—'}`)

          const labelParty = isTutor ? 'Alumno' : 'Tutor'

          const subject = s.materia?.descripcion || s.materia || s.subject || null

          const fecha = formatFechaHora(s.fechaInicio) || s.date || '—'

          const cancelable = !TERMINAL.includes(estado)
          const aceptable = isTutor && estado === 'Reservado'
          const concretable = isTutor && estado === 'Aceptado'
          const deletable = TERMINAL.includes(estado)

          return (
            <Card key={s.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Avatar name={oppositePartyName} size={44} shape="circle" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{oppositePartyName}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>· {labelParty}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-strong)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)' }}>
                      <IconCalendar width={14} height={14} /> {fecha}
                    </span>
                    {subject && (
                      <>
                        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', padding: '0 6px' }}>·</span>
                        <Badge tone="brand">{subject}</Badge>
                      </>
                    )}
                    {s.total > 0 && (
                      <>
                        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', padding: '0 6px' }}>·</span>
                        <span style={{ color: 'var(--text-strong)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)' }}>Precio: ${s.total}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <StatusPill status={estado} />
                {aceptable && <Button size="sm" variant="subtle" onClick={() => onAceptar(s.id)}>Aceptar</Button>}
                {concretable && <Button size="sm" onClick={() => onConcretar(s.id)}>Concretar</Button>}
                {cancelable && <Button size="sm" variant="danger" onClick={() => onCancelar(s.id)}>{isTutor ? 'Rechazar' : 'Cancelar'}</Button>}
                {deletable && <Button size="sm" variant="secondary" onClick={() => onEliminar(s.id)}>Eliminar</Button>}
              </div>
            </Card>
          )
        })}
      </div>

      <Modal
        open={cancelTarget != null}
        title="¿Cancelar esta sesión?"
        onClose={() => setCancelTarget(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setCancelTarget(null)}>Volver</Button>
            <Button variant="danger" onClick={confirmCancelar}>Confirmar cancelación</Button>
          </>
        }
      >
        Esta acción moverá la reserva al historial como cancelada.
      </Modal>

      <Modal
        open={deleteTarget != null}
        title="¿Eliminar esta reserva?"
        onClose={() => setDeleteTarget(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Volver</Button>
            <Button variant="danger" onClick={confirmEliminar}>Eliminar</Button>
          </>
        }
      >
        Esta acción eliminará la reserva de tu historial de forma permanente.
      </Modal>
    </Page>
  )
}