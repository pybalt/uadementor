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
  const [showPassword, setShowPassword] = useState(false)

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

  const pageStyle = {
    minHeight: 'calc(100vh - 180px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 12px',
  }

  const cardStyle = {
    width: '100%',
    maxWidth: 520,
    boxSizing: 'border-box',
    padding: 28,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.045)',
    boxShadow: '0 18px 45px rgba(0,0,0,0.24)',
  }

  const headerStyle = {
    margin: '0 0 18px',
    textAlign: 'center',
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 14,
  }

  const labelStyle = {
    display: 'block',
    marginBottom: 6,
    color: 'var(--muted)',
    fontSize: 13,
  }

  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
  }

  const selectStyle = {
    ...fieldStyle,
    background: '#111c2d',
    color: '#e8eef7',
    borderColor: 'rgba(255,255,255,0.1)',
    colorScheme: 'dark',
  }

  const optionStyle = {
    background: '#111c2d',
    color: '#e8eef7',
  }

  const fieldErrorStyle = {
    color: '#ff8f8f',
    fontSize: 12,
    marginTop: 5,
  }

  const checkboxLabelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--muted)',
    fontSize: 13,
    marginTop: 8,
    cursor: 'pointer',
  }

  const alertBaseStyle = {
    fontSize: 14,
    padding: '9px 12px',
    borderRadius: 8,
  }

  return (
    <div style={pageStyle}>
      <section style={cardStyle}>
        <h2 style={headerStyle}>Crear Cuenta</h2>

        <form onSubmit={submit} noValidate style={formStyle}>

          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Juan" style={fieldStyle} />
              {errors.nombre && <div style={fieldErrorStyle}>{errors.nombre}</div>}
            </div>
            <div>
              <label style={labelStyle}>Apellido</label>
              <input name="apellido" value={form.apellido} onChange={onChange} placeholder="Pérez" style={fieldStyle} />
              {errors.apellido && <div style={fieldErrorStyle}>{errors.apellido}</div>}
            </div>
          </div>

          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>DNI</label>
              <input name="dni" type="number" value={form.dni} onChange={onChange} placeholder="40123456" style={fieldStyle} />
              {errors.dni && <div style={fieldErrorStyle}>{errors.dni}</div>}
            </div>
            <div>
              <label style={labelStyle}>Teléfono</label>
              <input name="telefono" type="number" value={form.telefono} onChange={onChange} placeholder="1155551234" style={fieldStyle} />
              {errors.telefono && <div style={fieldErrorStyle}>{errors.telefono}</div>}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} placeholder="juan@email.com" style={fieldStyle} />
            {errors.email && <div style={fieldErrorStyle}>{errors.email}</div>}
          </div>

          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              name="pass"
              type={showPassword ? 'text' : 'password'}
              value={form.pass}
              onChange={onChange}
              placeholder="Mínimo 6 caracteres"
              style={fieldStyle}
            />
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
                style={{ margin: 0 }}
              />
              Mostrar contraseña
            </label>
            {errors.pass && <div style={fieldErrorStyle}>{errors.pass}</div>}
          </div>

          <div>
            <label style={labelStyle}>Rol</label>
            <select name="role" value={form.role} onChange={onChange} style={selectStyle}>
              <option value="alumno" style={optionStyle}>Alumno - busco tutores</option>
              <option value="tutor" style={optionStyle}>Tutor - ofrezco mentoría</option>
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

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: 2 }}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p style={{ margin: '18px 0 0', color: 'var(--muted)', fontSize: 14, textAlign: 'center' }}>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--accent-2)' }}>Iniciar sesión</Link>
        </p>
      </section>
    </div>
  )
}
