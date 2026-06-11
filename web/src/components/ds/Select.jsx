import React from 'react'

/** Native select styled to match UADE Mentor inputs. */
export function Select({ label, hint, error, value, onChange, children, options, disabled = false, id, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  const fieldId = id || (label ? `s-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--border-input)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{label}</label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
          id={fieldId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%', height: 'var(--field-height)', padding: '0 38px 0 14px',
            appearance: 'none', WebkitAppearance: 'none',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-strong)',
            background: 'var(--surface)', border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-md)',
            boxShadow: focus ? 'var(--shadow-focus)' : 'none', outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
            transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          }}
          {...rest}
        >
          {options ? options.map(o => (
            <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
          )) : children}
        </select>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', right: 12, pointerEvents: 'none' }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
      {error
        ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger-fg)' }}>{error}</span>
        : hint ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span> : null}
    </div>
  )
}