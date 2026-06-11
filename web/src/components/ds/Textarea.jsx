import React from 'react'

/** Multi-line text input — reviews, bios, messages. */
export function Textarea({ label, hint, error, value, onChange, placeholder, rows = 4, disabled = false, id, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  const fieldId = id || (label ? `t-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--border-input)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{label}</label>
      )}
      <textarea
        id={fieldId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', padding: '11px 14px', resize: 'vertical',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)',
          color: 'var(--text-strong)', background: 'var(--surface)',
          border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-md)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none', outline: 'none', boxSizing: 'border-box',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        }}
        {...rest}
      />
      {error
        ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger-fg)' }}>{error}</span>
        : hint ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span> : null}
    </div>
  )
}