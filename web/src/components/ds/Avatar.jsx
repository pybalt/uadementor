import React from 'react'

/** Circular/rounded initials avatar with brand gradient. */
export function Avatar({ name = '?', size = 44, src, shape = 'rounded', style = {} }) {
  const initials = String(name).trim().split(/\s+/).map(s => s[0]).slice(0, 2).join('').toUpperCase() || '?'
  const radius = shape === 'circle' ? '50%' : 'var(--radius-md)'
  return (
    <span style={{
      width: size, height: size, flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: radius, overflow: 'hidden',
      background: src ? 'var(--surface-sunken)' : 'linear-gradient(135deg, var(--avatar-from), var(--avatar-to))',
      color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
      fontSize: Math.round(size * 0.38), letterSpacing: '-0.01em',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)', ...style,
    }}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </span>
  )
}
