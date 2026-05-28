import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginMock } from '../services/mockApi'

export default function Login({ onLogin }){
  const [email,setEmail] = useState('alumno@demo')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    const u = await loginMock(email)
    if(!u){ alert('Usuario no encontrado (mock)'); return }
    onLogin(u)
    nav('/')
  }

  return (
    <div>
      <h2>Login (mock)</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <button style={{marginLeft:8}}>Entrar</button>
      </form>
      <p>Prueba con <em>alumno@demo</em> o <em>tutor@demo</em></p>
    </div>
  )
}
