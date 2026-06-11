import React from 'react'

/**
 * Session/booking status pill. Maps backend estados to brand colours:
 * Disponible · Reservado · Aceptado · Concretado · SesionCancelada · Pendiente
 */
const STATES = {
  Disponible:       { fg: 'var(--state-available-fg)', bg: 'var(--state-available-bg)', label: 'Disponible', dot: 'var(--sky-500)' },
  Reservado:        { fg: 'var(--state-reserved-fg)',  bg: 'var(--state-reserved-bg)',  label: 'Reservado',  dot: 'var(--amber-500)' },
  Pendiente:        { fg: 'var(--state-reserved-fg)',  bg: 'var(--state-reserved-bg)',  label: 'Pendiente',  dot: 'var(--amber-500)' },
  Aceptado:         { fg: 'var(--state-accepted-fg)',  bg: 'var(--state-accepted-bg)',  label: 'Aceptado',   dot: 'var(--blue-600)' },
  Concretado:       { fg: 'var(--state-done-fg)',      bg: 'var(--state-done-bg)',      label: 'Concretado', dot: 'var(--green-600)' },
  SesionCancelada:  { fg: 'var(--state-cancelled-fg)', bg: 'var(--state-cancelled-bg)', label: 'Cancelada',  dot: 'var(--red-500)' },
  Cancelado:        { fg: 'var(--state-cancelled-fg)', bg: 'var(--state-cancelled-bg)', label: 'Cancelada',  dot: 'var(--red-500)' },
}

export function StatusPill({ status = 'Pendiente', style = {} }) {
  const s = STATES[status] || STATES.Pendiente
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 11px 4px 8px', borderRadius: 'var(--radius-pill)',
      background: s.bg, color: s.fg,
      fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-bold)', ...style,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot }} />
      {s.label}
    </span>
  )
}