import React from 'react'

/**
 * UADE Mentor primary action button.
 * Variants: primary | secondary | ghost | danger | subtle
 * Sizes: sm | md | lg
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false)
  const [active, setActive] = React.useState(false)

  const sizes = {
    sm: { height: 'var(--field-height-sm)', padding: '0 14px', fontSize: 'var(--text-sm)', gap: 6, radius: 'var(--radius-sm)' },
    md: { height: 'var(--field-height)',    padding: '0 18px', fontSize: 'var(--text-base)', gap: 8, radius: 'var(--radius-md)' },
    lg: { height: 'var(--field-height-lg)', padding: '0 24px', fontSize: 'var(--text-md)', gap: 9, radius: 'var(--radius-md)' },
  }[size]

  const palette = {
    primary: {
      bg: hover ? 'var(--brand-hover)' : 'var(--brand)',
      color: 'var(--text-on-brand)',
      border: 'transparent',
      shadow: hover ? 'var(--shadow-brand)' : 'var(--shadow-xs)',
    },
    secondary: {
      bg: hover ? 'var(--surface-hover)' : 'var(--surface)',
      color: 'var(--brand)',
      border: 'var(--brand-border)',
      shadow: 'var(--shadow-xs)',
    },
    ghost: {
      bg: hover ? 'var(--brand-subtle)' : 'transparent',
      color: 'var(--brand)',
      border: 'transparent',
      shadow: 'none',
    },
    subtle: {
      bg: hover ? 'var(--brand-subtle-2)' : 'var(--brand-subtle)',
      color: 'var(--brand-hover)',
      border: 'transparent',
      shadow: 'none',
    },
    danger: {
      bg: hover ? 'var(--red-600)' : 'var(--danger)',
      color: '#fff',
      border: 'transparent',
      shadow: 'var(--shadow-xs)',
    },
  }[variant]

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false) }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes.gap,
        height: sizes.height,
        padding: sizes.padding,
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-semibold)',
        fontSize: sizes.fontSize,
        lineHeight: 1,
        letterSpacing: '-0.005em',
        color: palette.color,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: sizes.radius,
        boxShadow: palette.shadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transform: active && !disabled ? 'translateY(1px)' : 'translateY(0)',
        transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex', fontSize: '1.15em' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex', fontSize: '1.15em' }}>{iconRight}</span>}
    </button>
  )
}
