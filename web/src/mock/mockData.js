const tutors = [
  {
    id: 't1',
    name: 'María Gómez',
    subjects: ['Matemática', 'Álgebra', 'Cálculo'],
    rating: 4.8,
    bio: 'Titulada en Matemáticas, 5 años de experiencia dando apoyo universitario.',
    modality: 'Presencial y Online',
    hourlyRate: 1500,
    reviews: [
      { id: 'r1', user: 'Juan', stars: 5, comment: 'Excelente explicaciones.' }
    ],
    achievements: ['Tutor Destacado'],
  },
  {
    id: 't2',
    name: 'Lucas Fernández',
    subjects: ['Programación', 'Java', 'Estructuras de Datos'],
    rating: 4.6,
    bio: 'Ingeniero en sistemas con 7 años enseñando programación.',
    modality: 'Online',
    hourlyRate: 1900,
    reviews: [
      { id: 'r2', user: 'Ana', stars: 5, comment: 'Muy paciente y claro.' }
    ],
    achievements: ['Tutor Experto'],
  }
]

const users = [
  { id: 'u1', name: 'Alumno Demo', role: 'student', email: 'alumno@demo' },
  { id: 'u2', name: 'Tutor Demo', role: 'tutor', email: 'tutor@demo' }
]

const bookings = [
  // sample booking
  {
    id: 'b1',
    tutorId: 't1',
    userId: 'u1',
    date: '2026-06-02T18:00:00',
    status: 'Pendiente'
  }
]

export { tutors, users, bookings }
