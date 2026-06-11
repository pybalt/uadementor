import React from 'react'

/** Subject / topic chip — e.g. "Matemática", "Programación". */
export function Tag({ children, tone = 'neutral', onRemove, style = {} }) {
  const tones = {
    neutral: { fg: 'var(--slate-700)', bg: 'var(--slate-100)' },
    brand:   { fg: 'var(--brand-hover)', bg: 'var(--brand-subtle)' },
  }[tone]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 11px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-medium)', color: tones.fg, background: tones.bg,
      borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap', ...style,
    }}>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Quitar" style={{
          display: 'inline-flex', border: 'none', background: 'transparent', padding: 0,
          cursor: 'pointer', color: 'inherit', opacity: 0.6,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      )}
    </span>
  )
}
