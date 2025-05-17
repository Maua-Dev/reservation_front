import { cn } from '../utils/cn'

interface CalendaryCardProps {
  court: number
  location: string
  modality: string
  equipments: string[]
  time: number
  isChecked: boolean[]
  openModal: () => void
}

export function CalendaryCard({
  court,
  modality,
  openModal
}: CalendaryCardProps) {
  const courtColors: {
    [key: number]: string
  } = {
    0: 'border-yellow text-black z-[2]',
    1: 'border-blue-primary text-blue-primary z-[2]',
    2: 'border-blue-secondary text-blue-secondary z-[3]',
    3: 'border-blue-tertiary text-blue-tertiary z-[4]'
  }
  return (
    <>
      <div
        onClick={() => {
          openModal()
        }}
        className={cn(
          'z-10 flex h-full w-full flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 shadow-md duration-300 hover:z-50 hover:-translate-y-1 hover:cursor-pointer',
          courtColors[court]
        )}
      >
        <p>{court == 0 ? 'Campo' : `Quadra ${court}`}</p>
        <p>{modality}</p>
      </div>
    </>
  )
}
