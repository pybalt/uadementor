import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    if (!email || !password) {
      setError('Por favor, completa todos los campos.')
      setLoading(false)
      return
    }

    if (email.includes('@demo')) {
      const mockData = {
        token: 'fake-jwt-token-for-testing-12345',
        email: email,
        role: email === 'alumno@demo' ? 'ALUMNO' : 'TUTOR'
      }
      localStorage.setItem('token', mockData.token)
      onLogin(mockData)
      nav('/')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Credenciales incorrectas. Intenta de nuevo.')
      }

      const data = await response.json()

      if (data.token) {
        localStorage.setItem('token', data.token)
        onLogin(data)
        nav('/')
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>UADE Mentor</h2>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              id="email"
              type="email" 
              placeholder="ejemplo@uade.edu.ar"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}