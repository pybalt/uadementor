import React from 'react'

export default function Profile({ user }){
  if(!user) return <div>Inicia sesión para ver tu perfil.</div>
  return (
    <div>
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <h3>Logros (mock)</h3>
      <ul>
        <li>Alumno Comprometido</li>
      </ul>
    </div>
  )
}
