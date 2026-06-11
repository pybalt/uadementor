import React from 'react'

/** Generic surface container. `interactive` adds hover lift for clickable cards. */
export function Card({ children, padding = 20, interactive = false, as = 'div', style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false)
  const Tag = as
  return (
    <Tag
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: interactive && hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        padding,
        transform: interactive && hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        borderColor: interactive && hover ? 'var(--brand-border)' : 'var(--border)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
