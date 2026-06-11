import React from 'react'

/** Labelled metric tile for dashboards / profile stats. */
export function StatCard({ label, value, sub, tone = 'brand', icon, style = {} }) {
  const accent = {
    brand: 'var(--brand)', success: 'var(--success)', gold: 'var(--gold-500)', neutral: 'var(--text-strong)',
  }[tone]
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: 4, ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon && <span style={{ display: 'inline-flex', color: accent }}>{icon}</span>}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', letterSpacing: '0.01em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-bold)', lineHeight: 1, color: accent }}>{value}</span>
      {sub && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{sub}</span>}
    </div>
  )
}