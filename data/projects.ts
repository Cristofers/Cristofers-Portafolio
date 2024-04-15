interface projectsProps {
  title: string
  description?: string
  url: string
  active?: boolean
  icon?: string
  stats?: string
}

interface itemsProps {
  year: string
  projects: projectsProps[]
}

const items: itemsProps[] = []

export default items
