import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'

export default function Register({ onLogin }) {
  const nav = useNavigate()
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    pass: '',
    telefono: '',
    role: 'alumno',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await register({
        ...form,
        dni: parseInt(form.dni, 10),
        telefono: parseInt(form.telefono, 10),
      })
      onLogin(user)
      nav('/')
    } catch (err) {
      setError(err.message || 'Error al registrarse. Verificá los datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 440, margin: '0 auto' }}>
      <h2>Crear Cuenta</h2>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={onChange} required placeholder="Juan"
              style={{ width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Apellido</label>
            <input name="apellido" value={form.apellido} onChange={onChange} required placeholder="Pérez"
              style={{ width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>DNI</label>
            <input name="dni" type="number" value={form.dni} onChange={onChange} required placeholder="40123456"
              style={{ width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Teléfono</label>
            <input name="telefono" type="number" value={form.telefono} onChange={onChange} required placeholder="1155551234"
              style={{ width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="juan@email.com"
            style={{ width: '100%', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Contraseña</label>
          <input name="pass" type="password" value={form.pass} onChange={onChange} required placeholder="Mínimo 6 caracteres"
            style={{ width: '100%', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Rol</label>
          <select name="role" value={form.role} onChange={onChange}
            style={{ width: '100%', boxSizing: 'border-box' }}>
            <option value="alumno">Alumno — busco tutores</option>
            <option value="tutor">Tutor — ofrezco mentoría</option>
          </select>
        </div>

        {error && (
          <div style={{ color: '#ff6b6b', fontSize: 14, padding: '8px 12px', background: 'rgba(255,107,107,0.08)', borderRadius: 8 }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 4 }}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </button>
      </form>

      <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 14 }}>
        ¿Ya tenés cuenta?{' '}
        <Link to="/login" style={{ color: 'var(--accent-2)' }}>Iniciar sesión</Link>
      </p>
    </div>
  )
}
