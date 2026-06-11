import React from 'react'

/** Underline tab bar. Controlled via value/onChange. */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  const [internal, setInternal] = React.useState(tabs[0]?.value ?? tabs[0])
  const active = value !== undefined ? value : internal
  const select = (v) => { setInternal(v); onChange && onChange(v) }
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', ...style }}>
      {tabs.map((t) => {
        const v = t.value ?? t
        const label = t.label ?? t
        const isActive = v === active
        return (
          <button
            key={v}
            onClick={() => select(v)}
            style={{
              position: 'relative', border: 'none', background: 'transparent',
              padding: '10px 14px', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
              fontWeight: isActive ? 'var(--fw-bold)' : 'var(--fw-medium)',
              color: isActive ? 'var(--brand)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-out)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              {t.icon && <span style={{ display: 'inline-flex' }}>{t.icon}</span>}
              {label}
              {t.count != null && (
                <span style={{
                  fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', padding: '1px 7px',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'var(--brand-subtle)' : 'var(--slate-100)',
                  color: isActive ? 'var(--brand)' : 'var(--text-muted)',
                }}>{t.count}</span>
              )}
            </span>
            <span style={{
              position: 'absolute', left: 8, right: 8, bottom: -1, height: 2.5, borderRadius: 3,
              background: isActive ? 'var(--brand)' : 'transparent',
            }} />
          </button>
        )
      })}
    </div>
  )
}