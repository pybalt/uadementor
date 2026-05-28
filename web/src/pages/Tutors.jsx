import React, { useEffect, useState } from 'react'
import { getTutors, searchTutors } from '../services/mockApi'
import TutorCard from '../components/TutorCard'

export default function Tutors(){
  const [list,setList] = useState([])
  const [q,setQ] = useState('')

  useEffect(()=>{ getTutors().then(setList) },[])

  async function onSearch(e){
    e.preventDefault()
    const res = await searchTutors(q)
    setList(res)
  }

  return (
    <div>
      <h2>Buscar Tutores</h2>
      <form onSubmit={onSearch} className="search-form">
        <input placeholder="Nombre o materia" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn btn-primary" style={{marginLeft:8}}>Buscar</button>
      </form>
      <div className="grid">
        {list.map(t=> <TutorCard key={t.id} tutor={t} />)}
      </div>
    </div>
  )
}
