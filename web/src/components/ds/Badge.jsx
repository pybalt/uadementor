import React from 'react'

/** Small label chip. Tones map to the semantic palette. */
export function Badge({ children, tone = 'neutral', variant = 'soft', size = 'md', style = {} }) {
  const tones = {
    neutral: { fg: 'var(--slate-600)', bg: 'var(--slate-100)', solidBg: 'var(--slate-600)' },
    brand:   { fg: 'var(--brand-hover)', bg: 'var(--brand-subtle)', solidBg: 'var(--brand)' },
    success: { fg: 'var(--success-fg)', bg: 'var(--success-bg)', solidBg: 'var(--success)' },
    warning: { fg: 'var(--warning-fg)', bg: 'var(--warning-bg)', solidBg: 'var(--warning)' },
    danger:  { fg: 'var(--danger-fg)', bg: 'var(--danger-bg)', solidBg: 'var(--danger)' },
    info:    { fg: 'var(--info-fg)', bg: 'var(--info-bg)', solidBg: 'var(--info)' },
    gold:    { fg: 'var(--achievement)', bg: 'var(--achievement-bg)', solidBg: 'var(--gold-500)' },
  }[tone]
  const sizes = { sm: { fs: 'var(--text-2xs)', pad: '2px 7px' }, md: { fs: 'var(--text-xs)', pad: '3px 9px' } }[size]
  const solid = variant === 'solid'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: sizes.pad, fontFamily: 'var(--font-sans)', fontSize: sizes.fs,
      fontWeight: 'var(--fw-bold)', letterSpacing: '0.01em',
      color: solid ? '#fff' : tones.fg, background: solid ? tones.solidBg : tones.bg,
      borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap', ...style,
    }}>
      {children}
    </span>
  )
}
