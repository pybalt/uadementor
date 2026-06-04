import React, { useEffect, useState } from 'react'
import TutorCard from '../components/TutorCard'

const API_BASE = 'http://localhost:8080'

async function fetchTutores() {
  const res = await fetch(`${API_BASE}/tutores`)
  if (!res.ok) throw new Error('Error al cargar tutores')
  return res.json()
}

async function searchTutores(q) {
  const res = await fetch(`${API_BASE}/tutores/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('Error en búsqueda')
  return res.json()
}

export default function Tutors() {
  const [todos, setTodos] = useState([])   // lista completa
  const [list, setList] = useState([])     // lista filtrada
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchTutores()
      .then(data => { setTodos(data); setList(data) })
      .catch(() => setList([]))
      .finally(() => setLoading(false))
  }, [])

  function onSearch(e) {
    e.preventDefault()
    if (!q.trim()) {
      setList(todos)
      return
    }
    setLoading(true)
    searchTutores(q)
      .then(setList)
      .catch(() => {
        // fallback local si el backend falla
        const s = q.toLowerCase()
        setList(todos.filter(t => {
          const nombre = `${t.nombre || ''} ${t.apellido || ''}`.toLowerCase()
          const materias = (t.materias || []).map(m => (m.descripcion || '').toLowerCase()).join(' ')
          return nombre.includes(s) || materias.includes(s)
        }))
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <h2>Buscar Tutores</h2>
      <form onSubmit={onSearch} className="search-form">
        <input
          placeholder="Nombre, apellido o materia"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button className="btn btn-primary" style={{ marginLeft: 8 }}>Buscar</button>
      </form>

      {loading && <p style={{ color: 'var(--muted)', marginTop: 12 }}>Cargando...</p>}

      {!loading && list.length === 0 && (
        <p style={{ color: 'var(--muted)', marginTop: 12 }}>No se encontraron tutores.</p>
      )}

      <div className="grid">
        {list.map(t => <TutorCard key={t.id} tutor={t} />)}
      </div>
    </div>
  )
}
