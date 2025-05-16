import { FiLoader } from 'react-icons/fi'
import { useBookingsQuery } from '../hooks/use-booking'
import { Button } from './button'

interface ReservationCardProps {
  startDate: number
  endDate: number
  court?: string
  status?: string
  bookingId?: string
}

export function ReservationCard({
  startDate,
  endDate,
  court,
  status,
  bookingId
}: ReservationCardProps) {
  const { deleteBookingMutation } = useBookingsQuery()

  const handleCancel = async () => {
    if (bookingId) {
      await deleteBookingMutation.mutateAsync(bookingId)
    }
  }
  return (
    <div className="flex h-36 w-full cursor-pointer flex-row items-start rounded-lg bg-blue-primary p-4 md:h-44">
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold text-white md:text-2xl">
          {new Date(startDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
          })}
        </p>
        <p className="text-xs font-normal text-white sm:text-base md:text-lg">
          Hora: {new Date(startDate).getHours()}:00 -{' '}
          {new Date(endDate).getHours()}:00
        </p>
        <p className="text-xs font-normal text-white sm:text-base md:text-lg">
          Quadra: {court}
        </p>
        <p className="text-xs font-normal text-white sm:text-base md:text-lg">
          Status: {status}
        </p>
      </div>
      <div className="ml-auto flex flex-col justify-end">
        <Button
          className="h-8 w-20 bg-white p-2 text-sm font-bold text-black transition-colors hover:bg-red-400 md:w-36 lg:h-10 lg:text-lg"
          onClick={handleCancel}
          disabled={deleteBookingMutation.isPending}
        >
          {deleteBookingMutation.isPending ? (
            <FiLoader className="animate-spin" />
          ) : (
            'Cancelar'
          )}
        </Button>
      </div>
    </div>
  )
}
