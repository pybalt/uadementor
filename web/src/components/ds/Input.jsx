import React from 'react'

/**
 * Text input with label, hint, per-field error, and optional password
 * show/hide toggle.
 */
export function Input({
  label,
  hint,
  error,
  type = 'text',
  value,
  onChange,
  onClear,
  placeholder,
  disabled = false,
  required = false,
  iconLeft = null,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (show ? 'text' : 'password') : type
  const fieldId = id || (label ? `f-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
  const showClear = !!onClear && !!value

  const borderColor = error
    ? 'var(--danger)'
    : focus
      ? 'var(--brand)'
      : 'var(--border-input)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
          fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)',
        }}>
          {label}{required && <span style={{ color: 'var(--danger)', marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {iconLeft && (
          <span style={{ position: 'absolute', left: 12, display: 'inline-flex', color: 'var(--text-subtle)', pointerEvents: 'none' }}>
            {iconLeft}
          </span>
        )}
        <input
          id={fieldId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%',
            height: 'var(--field-height)',
            padding: `0 ${isPassword || showClear ? 38 : 14}px 0 ${iconLeft ? 38 : 14}px`,
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--text-strong)',
            background: disabled ? 'var(--surface-sunken)' : 'var(--surface)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-md)',
            boxShadow: focus ? 'var(--shadow-focus)' : 'none',
            outline: 'none',
            transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
            boxSizing: 'border-box',
          }}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            style={{
              position: 'absolute', right: 6, height: 32, width: 32,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)',
            }}
          >
            {show ? EyeOff : Eye}
          </button>
        )}
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar"
            style={{
              position: 'absolute', right: 6, height: 32, width: 32,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)',
            }}
          >
            {ClearIcon}
          </button>
        )}
      </div>
      {error
        ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger-fg)' }}>{error}</span>
        : hint
          ? <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span>
          : null}
    </div>
  )
}

const Eye = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOff = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.9 5.1A9.8 9.8 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3.2 4M6.6 6.6A17.6 17.6 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.5-1.1"/><path d="m3 3 18 18"/>
  </svg>
)
const ClearIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
)