import React, { useEffect, useState } from 'react'
import { getBookingsForUser } from '../services/mockApi'

export default function Bookings({ user }){
  const [list,setList] = useState([])

  useEffect(()=>{ if(user) getBookingsForUser(user.id).then(setList) },[user])

  if(!user) return <div>Necesitas iniciar sesión para ver tus reservas.</div>

  return (
    <div>
      <h2>Mis Reservas</h2>
      {list.length === 0 && <div>No hay reservas.</div>}
      <ul>
        {list.map(b => (
          <li key={b.id}>{b.date} — Tutor: {b.tutorId} — Estado: {b.status}</li>
        ))}
      </ul>
    </div>
  )
}
