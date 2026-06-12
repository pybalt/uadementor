import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'
import { Alert, Button, Card, Input, Logo, Page, Select } from '../components/ds'

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
      const payload = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        dni: parseInt(form.dni, 10),
        email: form.email.trim(),
        pass: form.pass,
        telefono: parseInt(form.telefono, 10),
        role: form.role,
      }
      const user = await register(payload)
      setSuccess('Cuenta creada correctamente. Redirigiendo...')
      onLogin(user)
      setTimeout(() => nav('/'), 900)
    } catch (err) {
      if (err.status === 400) {
        setSubmitError('No se pudo crear la cuenta. Revisá los datos o probá con otro email.')
      } else {
        setSubmitError('No se pudo crear la cuenta. Intentá nuevamente más tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }

  return (
    <Page width={520} style={{ padding: '40px 0' }}>
      <Card style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', padding: 32 }}>
        <Logo size="lg" />
        <h2 style={{ fontSize: 'var(--text-2xl)' }}>Crear cuenta</h2>

        <form onSubmit={submit} noValidate style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={gridStyle}>
            <Input label="Nombre" name="nombre" value={form.nombre} onChange={onChange} placeholder="Juan" error={errors.nombre} required />
            <Input label="Apellido" name="apellido" value={form.apellido} onChange={onChange} placeholder="Pérez" error={errors.apellido} required />
          </div>

          <div style={gridStyle}>
            <Input label="DNI" name="dni" type="number" value={form.dni} onChange={onChange} placeholder="40123456" error={errors.dni} required />
            <Input label="Teléfono" name="telefono" type="number" value={form.telefono} onChange={onChange} placeholder="1155551234" error={errors.telefono} required />
          </div>

          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="juan@email.com" error={errors.email} required />

          <Input
            label="Contraseña"
            name="pass"
            type="password"
            value={form.pass}
            onChange={onChange}
            placeholder="Mínimo 6 caracteres"
            error={errors.pass}
            required
          />

          <Select
            label="Rol"
            name="role"
            value={form.role}
            onChange={onChange}
            options={[
              { value: 'alumno', label: 'Alumno - busco tutores' },
              { value: 'tutor', label: 'Tutor - ofrezco mentoría' },
            ]}
          />

          {submitError && <Alert tone="danger">{submitError}</Alert>}
          {success && <Alert tone="success">{success}</Alert>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </Button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </Card>
    </Page>
  )
}