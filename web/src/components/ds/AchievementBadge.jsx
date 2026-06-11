import React from 'react'

const ICONS = {
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 4H4v2a3 3 0 0 0 3 3M17 4h3v2a3 3 0 0 0-3 3"/></>,
  medal:  <><circle cx="12" cy="14" r="6"/><path d="M12 11v3l2 1"/><path d="M9 8 7 2M15 8l2-6"/></>,
  star:   <><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.9 6.2 21l1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z"/></>,
  spark:  <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></>,
  book:   <><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z"/><path d="M8 7h6M8 11h6"/></>,
}

/**
 * Gamification badge for unlocked achievements (logros). Gold accent is
 * reserved for this use across the system.
 */
export function AchievementBadge({ label, icon = 'trophy', locked = false, style = {} }) {
  const glyph = ICONS[icon] || ICONS.trophy
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px 8px 10px', borderRadius: 'var(--radius-pill)',
      background: locked ? 'var(--slate-100)' : 'var(--achievement-bg)',
      border: `1px solid ${locked ? 'var(--border)' : 'var(--achievement-border)'}`,
      color: locked ? 'var(--text-subtle)' : 'var(--achievement)',
      fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-bold)',
      opacity: locked ? 0.7 : 1, ...style,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 26, height: 26, borderRadius: '50%',
        background: locked ? 'var(--slate-200)' : 'rgba(255,255,255,0.6)',
        color: locked ? 'var(--text-subtle)' : 'var(--achievement-icon)',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{glyph}</svg>
      </span>
      {label}
    </span>
  )
}