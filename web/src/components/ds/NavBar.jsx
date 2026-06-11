import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Logo } from './Logo.jsx'
import { Avatar } from './Avatar.jsx'

/**
 * Application top bar. Role-aware links (alumno vs tutor) and a user chip
 * or guest auth actions. Wraps react-router navigation.
 */
export function NavBar({ user = null, style = {} }) {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const isTutor = user?.role === 'tutor'

  const getInitialTheme = () => {
    if (typeof document === 'undefined') return 'light'
    let stored = null
    try { stored = localStorage.getItem('uadem-theme') } catch { /* ignore */ }
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const [theme, setTheme] = React.useState(getInitialTheme)

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('uadem-theme', next) } catch { /* ignore */ }
    setTheme(next)
  }

  const links = isTutor
    ? [{ to: '/', label: 'Inicio' }, { to: '/bookings', label: 'Mis Tutorías' }, { to: '/profile', label: 'Mi Perfil' }]
    : [{ to: '/', label: 'Inicio' }, { to: '/tutors', label: 'Tutores' }, { to: '/bookings', label: 'Mis Reservas' }, { to: '/profile', label: 'Mi Perfil' }]

  const go = (to) => nav(to)
  const firstName = user
    ? String(user.nombre || user.name || user.email || '').split(/[\s@]/)[0]
    : null

  return (
    <header style={{
      height: 'var(--nav-height)', display: 'flex', alignItems: 'center', gap: 24,
      padding: '0 24px', background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 10,
      ...style,
    }}>
      <button onClick={() => go('/')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
        <Logo size="md" />
      </button>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
        {links.map((l) => {
          const isActive = pathname === l.to
          return (
            <button
              key={l.to}
              onClick={() => go(l.to)}
              style={{
                border: 'none', background: isActive ? 'var(--brand-subtle)' : 'transparent',
                padding: '8px 13px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
                fontWeight: isActive ? 'var(--fw-bold)' : 'var(--fw-medium)',
                color: isActive ? 'var(--brand)' : 'var(--text-muted)',
                transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
              }}
            >
              {l.label}
            </button>
          )
        })}
      </nav>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38,
            border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: 'var(--radius-pill)',
            cursor: 'pointer', color: 'var(--text-muted)',
          }}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
        {user ? (
          <button onClick={() => go('/profile')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, border: '1px solid var(--border)',
            background: 'var(--surface)', padding: '5px 12px 5px 6px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
          }}>
            <Avatar name={firstName} size={28} shape="circle" />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{firstName}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', color: isTutor ? 'var(--brand)' : 'var(--text-muted)', padding: '2px 7px', borderRadius: 'var(--radius-pill)', background: isTutor ? 'var(--brand-subtle)' : 'var(--slate-100)' }}>
              {isTutor ? 'Tutor' : 'Alumno'}
            </span>
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button onClick={() => go('/login')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-body)', padding: '8px 12px' }}>Entrar</button>
            <button onClick={() => go('/register')} style={{ border: 'none', background: 'var(--brand)', color: 'var(--text-on-brand)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--fw-semibold)', padding: '9px 16px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)' }}>Registrarse</button>
          </div>
        )}
      </div>
    </header>
  )
}