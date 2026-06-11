import React from 'react'

/** Centered content column used by every screen. */
export function Page({ children, width = 1080, style = {} }) {
  return (
    <div style={{ maxWidth: width, margin: '0 auto', ...style }}>
      {children}
    </div>
  )
}

/** Eyebrow + title + subtitle heading block. */
export function SectionTitle({ eyebrow, title, sub, align = 'left', style = {} }) {
  return (
    <div style={{ textAlign: align, marginBottom: 'var(--space-6)', ...style }}>
      {eyebrow && <div className="ds-eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
      {title && <h2 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>{title}</h2>}
      {sub && <p style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 'var(--text-base)' }}>{sub}</p>}
    </div>
  )
}