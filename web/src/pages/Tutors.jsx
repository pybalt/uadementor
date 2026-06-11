import React, { useEffect, useMemo, useState } from 'react'
import TutorCard from '../components/TutorCard'
import { Card, Checkbox, Input, Page, SectionTitle, Select, Tag } from '../components/ds'
import { IconSearch, IconSliders } from '../components/ds/icons'
import { fillWithMockTutors } from '../services/mockApi'

const API_BASE = 'http://localhost:8080'

async function fetchTutores() {
  const res = await fetch(`${API_BASE}/tutores`)
  if (!res.ok) throw new Error('Error al cargar tutores')
  return res.json()
}

const RATING_OPTIONS = [
  { key: 'all', label: 'Todos', test: () => true },
  { key: '4plus', label: '4+ estrellas', test: r => r >= 4 },
  { key: '4.5plus', label: '4.5+ estrellas', test: r => r >= 4.5 },
  { key: 'above4.5', label: 'Más de 4.5 estrellas', test: r => r > 4.5 },
]
const SORTS = [
  { value: 'rating', label: 'Mejor calificados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
]

const MODALITIES = ['Online', 'Presencial']

const MATERIA_OPTIONS = [
  'Matemática', 'Programación', 'Álgebra', 'Cálculo', 'Estructuras de Datos',
  'Bases de Datos', 'Economía', 'Física', 'Contabilidad', 'Marketing',
]

function getMateriaNames(t) {
  if (t.materias) return t.materias.map(m => m.descripcion || m).filter(Boolean)
  return (t.subjects || []).filter(Boolean)
}

function getModality(t) {
  return t.ciudadesServicio ? t.ciudadesServicio.join(' · ') : (t.modality || '')
}

function getDisplayName(t) {
  return t.nombre ? `${t.nombre} ${t.apellido || ''}`.trim() : (t.name || '')
}

export default function Tutors() {
  const [todos, setTodos] = useState([])   // lista completa (backend + mock)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)

  const [selectedModalities, setSelectedModalities] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [ratingFilter, setRatingFilter] = useState('all')
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort, setSort] = useState('rating')

  useEffect(() => {
    setLoading(true)
    fetchTutores()
      .then(data => fillWithMockTutors(data))
      .catch(() => fillWithMockTutors([]))
      .then(setTodos)
      .finally(() => setLoading(false))
  }, [])

  const priceFloor = useMemo(() => {
    const prices = todos.map(t => t.hourlyRate || 0).filter(p => p > 0)
    return prices.length ? Math.min(...prices) : 0
  }, [todos])

  const priceCeiling = useMemo(() => {
    const max = Math.max(0, ...todos.map(t => t.hourlyRate || 0))
    return max > 0 ? max : 5000
  }, [todos])

  const effectiveMaxPrice = maxPrice ?? priceCeiling

  function toggleModality(modality) {
    setSelectedModalities(s => s.includes(modality) ? s.filter(x => x !== modality) : [...s, modality])
  }

  function toggleSubject(subject) {
    setSelectedSubjects(s => s.includes(subject) ? s.filter(x => x !== subject) : [...s, subject])
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()

    let result = todos.filter(t => {
      if (query) {
        const nombre = getDisplayName(t).toLowerCase()
        const materias = getMateriaNames(t).join(' ').toLowerCase()
        if (!nombre.includes(query) && !materias.includes(query)) return false
      }

      if (selectedModalities.length > 0) {
        const modality = getModality(t).toLowerCase()
        if (!selectedModalities.some(m => modality.includes(m.toLowerCase()))) return false
      }

      if (selectedSubjects.length > 0) {
        const materias = getMateriaNames(t)
        if (!selectedSubjects.some(s => materias.includes(s))) return false
      }

      const ratingOption = RATING_OPTIONS.find(o => o.key === ratingFilter) || RATING_OPTIONS[0]
      if (!ratingOption.test(t.rating ?? 0)) return false
      if (maxPrice != null && (t.hourlyRate || 0) > maxPrice) return false

      return true
    })

    result = [...result].sort((a, b) => {
      if (sort === 'price-asc') return (a.hourlyRate || 0) - (b.hourlyRate || 0)
      if (sort === 'price-desc') return (b.hourlyRate || 0) - (a.hourlyRate || 0)
      return (b.rating || 0) - (a.rating || 0)
    })

    return result
  }, [todos, q, selectedModalities, selectedSubjects, ratingFilter, maxPrice, sort])

  const activeFilters = [
    ...selectedModalities.map(m => ({ key: `modality:${m}`, label: m, clear: () => toggleModality(m) })),
    ...selectedSubjects.map(s => ({ key: `subject:${s}`, label: s, clear: () => toggleSubject(s) })),
    ...(ratingFilter !== 'all'
      ? [{ key: 'rating', label: RATING_OPTIONS.find(o => o.key === ratingFilter)?.label, clear: () => setRatingFilter('all') }]
      : []),
    ...(maxPrice != null ? [{ key: 'price', label: `Hasta $${maxPrice}/h`, clear: () => setMaxPrice(null) }] : []),
  ]

  return (
    <Page>
      <SectionTitle eyebrow="Tutores" title="Buscá tu próximo mentor" sub="Explorá por materia, calificación y precio para encontrar al tutor ideal." />

      <div style={{ display: 'flex', gap: 10, marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Input
          iconLeft={<IconSearch />}
          placeholder="Nombre, apellido o materia"
          value={q}
          onChange={e => setQ(e.target.value)}
          onClear={() => setQ('')}
          style={{ flex: '1 1 280px' }}
        />
        <Select
          value={sort}
          onChange={e => setSort(e.target.value)}
          options={SORTS}
          style={{ width: 220 }}
        />
      </div>

      {activeFilters.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
          {activeFilters.map(f => (
            <Tag key={f.key} tone="brand" onRemove={f.clear}>{f.label}</Tag>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
        <Card style={{ position: 'sticky', top: 'calc(var(--nav-height) + 16px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <IconSliders />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)' }}>Filtros</span>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Modalidad</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {MODALITIES.map(m => (
                <Checkbox key={m} label={m} checked={selectedModalities.includes(m)} onChange={() => toggleModality(m)} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Materia</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
              {MATERIA_OPTIONS.map(s => (
                <Checkbox key={s} label={s} checked={selectedSubjects.includes(s)} onChange={() => toggleSubject(s)} />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Rating mínimo</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {RATING_OPTIONS.map(o => (
                <button key={o.key} onClick={() => setRatingFilter(o.key)} style={{
                  border: '1px solid', borderColor: ratingFilter === o.key ? 'var(--brand)' : 'var(--border)',
                  background: ratingFilter === o.key ? 'var(--brand-subtle)' : 'var(--surface)',
                  color: ratingFilter === o.key ? 'var(--brand)' : 'var(--text-body)',
                  borderRadius: 'var(--radius-md)', padding: '6px 12px', fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--fw-semibold)', cursor: 'pointer', textAlign: 'left',
                }}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
              Precio máximo por hora
            </div>
            <input
              type="range"
              min={priceFloor}
              max={priceCeiling}
              step={50}
              value={effectiveMaxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>
              <span>${priceFloor}</span>
              <span>${priceCeiling}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-body)' }}>
              Hasta ${effectiveMaxPrice}/h
            </div>
          </div>
        </Card>

        <div>
          {loading && <p style={{ color: 'var(--text-muted)' }}>Cargando...</p>}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-9) 0', color: 'var(--text-muted)' }}>
              <p style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>Sin resultados</p>
              <p style={{ marginTop: 6 }}>No encontramos tutores que coincidan con tu búsqueda.</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
            {filtered.map(t => <TutorCard key={t.id} tutor={t} />)}
          </div>
        </div>
      </div>
    </Page>
  )
}
