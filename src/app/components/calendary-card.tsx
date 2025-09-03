import { cn } from '../utils/cn'

interface CalendaryCardProps {
  court: number
  location: string
  ity: string
  equipments: string[]
  time: number
  isChecked: boolean[]
  open: () => void
}

export function CalendaryCard({
  court,
  ity,
  open
}: CalendaryCardProps) {
  const courtColors: {
    [key: number]: string
  } = {
    // BEACH AS COURT 6 MUST BE A TEMPORARY FIX
    6: 'border-[#E5CBA8] text-black z-[1]',
    0: 'border-yellow text-black z-[2]',
    1: 'border-blue-primary text-blue-primary z-[1]',
    2: 'border-blue-secondary text-blue-secondary z-[2]',
    3: 'border-blue-tertiary text-blue-tertiary z-[3]'
  }
  return (
    <>
      <div
        onClick={() => {
          open()
        }}
        className={cn(
          'z-10 flex h-full w-full flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 text-center shadow-md duration-300 hover:z-10 hover:-translate-y-1 hover:cursor-pointer',
          courtColors[court]
        )}
      >
        <p>{court == 0 ? 'Campo' : court == 6 ? `Beach` : `Quadra ${court}`}</p>
        <p>{ity}</p>
      </div>
    </>
  )
}
