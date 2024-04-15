export interface diplomaProps {
  index: number
  image: string
  title: string
  description: string
  duration: string
}

const items: diplomaProps[] = [
  {
    index: 1,
    image: 'ruta/de/la/imagen1.jpg',
    title: 'Diploma en Desarrollo Web',
    description:
      'Este diploma cubre los fundamentos del desarrollo web, incluyendo HTML, CSS y JavaScript.',
    duration: '6 meses',
  },
  {
    index: 2,
    image: 'ruta/de/la/imagen2.jpg',
    title: 'Diploma en Ciencia de Datos',
    description:
      'Este diploma proporciona conocimientos en análisis de datos, aprendizaje automático y estadísticas.',
    duration: '12 meses',
  },
  // Puedes agregar más elementos de la misma manera si necesitas
]

export default items
