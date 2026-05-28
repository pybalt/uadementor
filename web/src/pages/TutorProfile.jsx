import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTutorById, createBooking, addReview } from '../services/mockApi'

export default function TutorProfile({ user }){
  const { id } = useParams()
  const nav = useNavigate()
  const [tutor,setTutor] = useState(null)
  const [date,setDate] = useState('')
  const [comment,setComment] = useState('')
  const [stars,setStars] = useState(5)

  useEffect(()=>{ getTutorById(id).then(setTutor) },[id])

  async function onBook(){
    if(!user){ return nav('/login') }
    await createBooking({ tutorId: id, userId: user.id, date })
    alert('Reserva creada (mock)')
    nav('/bookings')
  }

  async function onReview(){
    if(!user){ return nav('/login') }
    const r = { id: 'r' + Date.now(), user: user.name, stars: Number(stars), comment }
    await addReview(id, r)
    setComment('')
    alert('Reseña enviada (mock)')
    setTutor(await getTutorById(id))
  }

  if(!tutor) return <div>Cargando...</div>

  return (
    <div>
      <h2>{tutor.name} <small style={{color:'#666'}}>{tutor.rating}★</small></h2>
      <p>{tutor.bio}</p>
      <p><strong>Materias:</strong> {tutor.subjects.join(', ')}</p>
      <p><strong>Modalidad:</strong> {tutor.modality} • ${tutor.hourlyRate}</p>

      <hr />
      <h3>Reservar sesión</h3>
      <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
      <button onClick={onBook} style={{marginLeft:8}}>Reservar</button>

      <hr />
      <h3>Reseñas</h3>
      <div>
        {tutor.reviews.map(r => (
          <div key={r.id} style={{borderTop:'1px solid #eee',paddingTop:8}}>
            <strong>{r.user}</strong> · {r.stars}★
            <div style={{marginTop:4}}>{r.comment}</div>
          </div>
        ))}
      </div>

      <h4>Dejar Reseña (mock)</h4>
      <select value={stars} onChange={e=>setStars(e.target.value)}>
        {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} estrellas</option>)}
      </select>
      <br />
      <textarea placeholder="Comentario" value={comment} onChange={e=>setComment(e.target.value)} />
      <br />
      <button onClick={onReview}>Enviar reseña</button>
    </div>
  )
}
