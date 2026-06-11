import React from 'react'

/**
 * UADE Mentor typographic wordmark. The mark is a rounded "graduation"
 * monogram tile + the product name. `variant` switches for dark backgrounds.
 */
export function Logo({ size = 'md', variant = 'default', showText = true, style = {} }) {
  const dims = { sm: { tile: 26, radius: 7, name: 16, gap: 9 }, md: { tile: 32, radius: 9, name: 19, gap: 11 }, lg: { tile: 42, radius: 12, name: 25, gap: 13 } }[size]
  const onDark = variant === 'inverse'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: dims.gap, ...style }}>
      <span style={{
        width: dims.tile, height: dims.tile, flexShrink: 0,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: dims.radius,
        background: 'linear-gradient(140deg, var(--blue-500), var(--blue-700))',
        boxShadow: '0 2px 8px rgba(37,72,219,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}>
        <svg width={dims.tile * 0.6} height={dims.tile * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 9 12 4 2 9l10 5 10-5Z"/>
          <path d="M6 11.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4.5"/>
        </svg>
      </span>
      {showText && (
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: dims.name, fontWeight: 'var(--fw-extrabold)',
          letterSpacing: '-0.02em', lineHeight: 1, color: onDark ? '#fff' : 'var(--text-strong)',
        }}>
          UADE<span style={{ color: onDark ? 'var(--sky-300)' : 'var(--brand)' }}> Mentor</span>
        </span>
      )}
    </span>
  )
}