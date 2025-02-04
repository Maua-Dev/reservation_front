import { cn } from '../utils/cn'

interface CalendaryCardProps {
  isOpen: boolean
  court: number
  modality: string
}

export function CalendaryCard({ court, modality }: CalendaryCardProps) {
  const courtColors: {
    [key: number]: string
  } = {
    1: 'border-blue-primary text-blue-primary',
    2: 'border-blue-secondary text-blue-secondary',
    3: 'border-blue-tertiary text-blue-tertiary'
  }
  return (
    <div
      className={cn(
        'flex h-20 w-20 flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 shadow-md duration-300 hover:-translate-y-1',
        courtColors[court]
      )}
    >
      <p>Quadra {court}</p>
      <p>{modality}</p>
    </div>
  )
}
