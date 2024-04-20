export interface diplomaProps {
  index: number
  image: string
  title: string
  description: string
  duration: string
  herf?: string
}

const items: diplomaProps[] = [
  {
    index: 1,
    image: 'Solving_TypeScript_Errors.jpeg',
    title: 'Solving TypeScript Errors',
    description: '',
    duration: 'Una semana',
  },
  {
    index: 2,
    image: 'React_TypeScript.jpeg',
    title: 'React With TypeScript',
    description: '',
    duration: 'Una semana',
  },
  {
    index: 3,
    image: 'BeginnersTypescript.jpeg',
    title: 'Beginners Typescript',
    description: '',
    duration: 'Una semana',
  },
  {
    index: 3,
    image: 'Zod.jpeg',
    title: 'Zod',
    description: '',
    duration: 'Una semana',
  },
]

export default items
