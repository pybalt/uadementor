import React from 'react'

/** Star rating display (read-only) or interactive input when onChange is set. */
export function RatingStars({ value = 0, max = 5, size = 18, showValue = false, onChange, style = {} }) {
  const [hover, setHover] = React.useState(0)
  const interactive = typeof onChange === 'function'
  const shown = interactive && hover ? hover : value
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: showValue ? 7 : 2, ...style }}>
      <span style={{ display: 'inline-flex', gap: 1 }}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= Math.round(shown)
          return (
            <span
              key={i}
              onMouseEnter={interactive ? () => setHover(i + 1) : undefined}
              onMouseLeave={interactive ? () => setHover(0) : undefined}
              onClick={interactive ? () => onChange(i + 1) : undefined}
              style={{ display: 'inline-flex', cursor: interactive ? 'pointer' : 'default', lineHeight: 0 }}
            >
              <svg width={size} height={size} viewBox="0 0 24 24"
                fill={filled ? 'var(--gold-400)' : 'var(--slate-200)'}
                stroke={filled ? 'var(--gold-500)' : 'var(--slate-300)'} strokeWidth="1">
                <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.9 6.2 21l1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z"/>
              </svg>
            </span>
          )
        })}
      </span>
      {showValue && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{Number(value).toFixed(1)}</span>}
    </span>
  )
}