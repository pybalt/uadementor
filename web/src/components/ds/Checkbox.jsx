import React from 'react'

/** Checkbox with label — e.g. "Mostrar contraseña", terms, filters. */
export function Checkbox({ checked = false, onChange, label, disabled = false, id, style = {}, ...rest }) {
  const fieldId = id || (label ? `c-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
  return (
    <label htmlFor={fieldId} style={{
      display: 'inline-flex', alignItems: 'center', gap: 9, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1, ...style,
    }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 20, height: 20, flexShrink: 0 }}>
        <input
          id={fieldId}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'inherit' }}
          {...rest}
        />
        <span style={{
          width: 20, height: 20, borderRadius: 'var(--radius-xs)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: checked ? 'var(--brand)' : 'var(--surface)',
          border: `1.5px solid ${checked ? 'var(--brand)' : 'var(--border-strong)'}`,
          transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        }}>
          {checked && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          )}
        </span>
      </span>
      {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  )
}