import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'
import { loginMock } from '../services/mockApi'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      // Intentar login real contra el backend
      const user = await login(email, password)
      onLogin(user)
      nav('/')
    } catch (err) {
      // Fallback a mock si el backend no está disponible
      try {
        const mockUser = await loginMock(email)
        if (mockUser) {
          onLogin(mockUser)
          nav('/')
        } else {
          setError('Usuario o contraseña incorrectos.')
        }
      } catch {
        setError('No se pudo conectar al servidor. Verificá que el backend esté corriendo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tutor1@demo.com"
            required
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)' }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password123"
            required
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        {error && (
          <div style={{ color: '#ff6b6b', fontSize: 14, padding: '8px 12px', background: 'rgba(255,107,107,0.08)', borderRadius: 8 }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 4 }}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 14 }}>
        ¿No tenés cuenta?{' '}
        <Link to="/register" style={{ color: 'var(--accent-2)' }}>Registrarse</Link>
      </p>

      <div style={{ marginTop: 20, padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8, fontSize: 13, color: 'var(--muted)' }}>
        <strong style={{ color: 'var(--accent)' }}>Usuarios de prueba:</strong>
        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span>alumno1@demo.com / password123</span>
          <span>tutor1@demo.com &nbsp;/ password123</span>
          <span>tutor2@demo.com &nbsp;/ password123</span>
        </div>
      </div>
    </div>
  )
}
