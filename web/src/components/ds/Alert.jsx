import React from 'react'

/** Inline message banner — success / error / info / warning. */
export function Alert({ tone = 'info', title, children, style = {} }) {
  const map = {
    success: { fg: 'var(--success-fg)', bg: 'var(--success-bg)', bd: 'var(--success-border)', icon: check },
    danger:  { fg: 'var(--danger-fg)',  bg: 'var(--danger-bg)',  bd: 'var(--danger-border)',  icon: x },
    warning: { fg: 'var(--warning-fg)', bg: 'var(--warning-bg)', bd: 'var(--warning-border)', icon: warn },
    info:    { fg: 'var(--info-fg)',    bg: 'var(--info-bg)',    bd: 'var(--info-border)',    icon: info },
  }[tone]
  return (
    <div role="status" style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      padding: '11px 14px', borderRadius: 'var(--radius-md)',
      background: map.bg, border: `1px solid ${map.bd}`, color: map.fg, ...style,
    }}>
      <span style={{ display: 'inline-flex', flexShrink: 0, marginTop: 1 }}>{map.icon}</span>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-snug)' }}>
        {title && <div style={{ fontWeight: 'var(--fw-bold)', marginBottom: children ? 2 : 0 }}>{title}</div>}
        {children}
      </div>
    </div>
  )
}

const ico = (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
const check = ico(<><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>)
const x = ico(<><circle cx="12" cy="12" r="9"/><path d="m15 9-6 6M9 9l6 6"/></>)
const warn = ico(<><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></>)
const info = ico(<><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></>)