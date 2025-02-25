import { useState } from 'react'
import { cn } from '../utils/cn'
import { Modal } from './modal'
import { ReservationDetails } from './reservation-details'

interface CalendaryCardProps {
  court: number
  location: string
  modality: string
  equipments: string[]
  time: number
  isChecked: boolean[]
}

export function CalendaryCard({
  court,
  location,
  modality,
  equipments,
  time,
  isChecked
}: CalendaryCardProps) {
  const [open, setOpen] = useState(false)

  const courtColors: {
    [key: number]: string
  } = {
    1: 'border-blue-primary text-blue-primary',
    2: 'border-blue-secondary text-blue-secondary',
    3: 'border-blue-tertiary text-blue-tertiary'
  }
  return (
    <>
      <div
        onClick={() => {
          setOpen(true)
          console.log(time)
        }}
        className={cn(
          'z-10 flex h-full w-full flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 shadow-md duration-300 hover:z-50 hover:-translate-y-1',
          courtColors[court]
        )}
      >
        <p>Quadra {court}</p>
        <p>{modality}</p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ReservationDetails
          location={location}
          modality={modality}
          equipments={equipments}
          time={time}
          isChecked={isChecked}
        />
      </Modal>
    </>
  )
}
