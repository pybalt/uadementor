import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'
import { loginMock } from '../services/mockApi'
import { Alert, Button, Card, Input, Logo, Page } from '../components/ds'

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
      const user = await login(email, password)
      onLogin(user)
      nav('/')
    } catch (err) {
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
    <Page width={400} style={{ padding: '40px 0' }}>
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', padding: 32 }}>
        <Logo size="lg" />
        <h2 style={{ fontSize: 'var(--text-2xl)' }}>Iniciar sesión</h2>

        <form onSubmit={submit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tutor1@demo.com"
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password123"
            required
          />

          {error && <Alert tone="danger">{error}</Alert>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
          ¿No tenés cuenta? <Link to="/register">Registrarse</Link>
        </p>

        <div style={{
          width: '100%', padding: 12, background: 'var(--surface-sunken)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
        }}>
          <strong style={{ color: 'var(--brand)' }}>Usuarios de prueba:</strong>
          <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span>alumno1@demo.com / password123</span>
            <span>tutor1@demo.com &nbsp;/ password123</span>
            <span>tutor2@demo.com &nbsp;/ password123</span>
          </div>
        </div>
      </Card>
    </Page>
  )
}