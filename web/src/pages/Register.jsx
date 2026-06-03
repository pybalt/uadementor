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
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(current => ({ ...current, [name]: '' }))
    setSubmitError('')
    setSuccess('')
  }

  function validateForm() {
    const nextErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!form.nombre.trim()) nextErrors.nombre = 'El nombre es obligatorio.'
    if (!form.apellido.trim()) nextErrors.apellido = 'El apellido es obligatorio.'
    if (!form.dni.trim()) nextErrors.dni = 'El DNI es obligatorio.'
    if (!form.telefono.trim()) nextErrors.telefono = 'El teléfono es obligatorio.'

    if (!form.email.trim()) {
      nextErrors.email = 'El email es obligatorio.'
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'El email no tiene un formato válido.'
    }

    if (!form.pass) {
      nextErrors.pass = 'La contraseña es obligatoria.'
    } else if (form.pass.length < 6) {
      nextErrors.pass = 'La contraseña debe tener al menos 6 caracteres.'
    }

    return nextErrors
  }

  async function submit(e) {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)
    setSubmitError('')
    setSuccess('')

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    try {
      const user = await register({
        ...form,
        dni: parseInt(form.dni, 10),
        telefono: parseInt(form.telefono, 10),
      })
      setSuccess('Cuenta creada correctamente. Redirigiendo...')
      onLogin(user)
      setTimeout(() => nav('/'), 900)
    } catch (err) {
      setSubmitError(err.message || 'Error al registrarse. Verificá los datos.')
    } finally {
      setLoading(false)
    }
  }

  const fieldErrorStyle = {
    color: '#ff8f8f',
    fontSize: 12,
    marginTop: 4,
  }

  const alertBaseStyle = {
    fontSize: 14,
    padding: '8px 12px',
    borderRadius: 8,
  }

  return (
    <div style={{ maxWidth: 440, margin: '0 auto' }}>
      <h2>Crear Cuenta</h2>

      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Juan"
              style={{ width: '100%', boxSizing: 'border-box' }} />
            {errors.nombre && <div style={fieldErrorStyle}>{errors.nombre}</div>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Apellido</label>
            <input name="apellido" value={form.apellido} onChange={onChange} placeholder="Pérez"
              style={{ width: '100%', boxSizing: 'border-box' }} />
            {errors.apellido && <div style={fieldErrorStyle}>{errors.apellido}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>DNI</label>
            <input name="dni" type="number" value={form.dni} onChange={onChange} placeholder="40123456"
              style={{ width: '100%', boxSizing: 'border-box' }} />
            {errors.dni && <div style={fieldErrorStyle}>{errors.dni}</div>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Teléfono</label>
            <input name="telefono" type="number" value={form.telefono} onChange={onChange} placeholder="1155551234"
              style={{ width: '100%', boxSizing: 'border-box' }} />
            {errors.telefono && <div style={fieldErrorStyle}>{errors.telefono}</div>}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="juan@email.com"
            style={{ width: '100%', boxSizing: 'border-box' }} />
          {errors.email && <div style={fieldErrorStyle}>{errors.email}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Contraseña</label>
          <input name="pass" type="password" value={form.pass} onChange={onChange} placeholder="Mínimo 6 caracteres"
            style={{ width: '100%', boxSizing: 'border-box' }} />
          {errors.pass && <div style={fieldErrorStyle}>{errors.pass}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 4, color: 'var(--muted)', fontSize: 13 }}>Rol</label>
          <select name="role" value={form.role} onChange={onChange}
            style={{ width: '100%', boxSizing: 'border-box' }}>
            <option value="alumno">Alumno - busco tutores</option>
            <option value="tutor">Tutor - ofrezco mentoría</option>
          </select>
        </div>

        {submitError && (
          <div style={{ ...alertBaseStyle, color: '#ff6b6b', background: 'rgba(255,107,107,0.08)' }}>
            {submitError}
          </div>
        )}

        {success && (
          <div style={{ ...alertBaseStyle, color: '#5ee6a8', background: 'rgba(94,230,168,0.08)' }}>
            {success}
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
