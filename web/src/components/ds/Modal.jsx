import React from 'react'

/** Simple centered modal/dialog with overlay. Renders nothing when `open` is false. */
export function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(12, 17, 28, 0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 420,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-xl)',
          padding: 'var(--space-6)',
        }}
      >
        {title && <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 8 }}>{title}</h3>}
        {children && (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
            {children}
          </p>
        )}
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
