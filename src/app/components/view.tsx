import { IoClose } from 'react-icons/io5'
import { ReservationCard } from './reservation-view'
import { useEffect } from 'react'
import { useUser } from '../hooks/use-user'
import { Button } from './button'
import { useBookings, useBookingsQuery } from '../hooks/use-booking'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface ViewProps {
  onClose: () => void
}

export function View({ onClose }: ViewProps) {
  const { user } = useUser()
  const isLogged = user !== null

  const { getMyBookingsQuery } = useBookingsQuery()

  const { myBookings, setMyBookings } = useBookings()

  const sortedBookings = myBookings
    .slice()
    .sort((a, b) => b.start_date - a.start_date)

  setMyBookings(getMyBookingsQuery.data?.bookings || [])

  const fetchBookings = async () => {
    try {
      const refetchResult = await getMyBookingsQuery.refetch()
      setMyBookings(refetchResult.data?.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  fetchBookings()

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  if (getMyBookingsQuery.isLoading) {
    return (
      <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
        <div className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      </div>
    )
  }

  if (
    getMyBookingsQuery.isError &&
    getMyBookingsQuery.error.message == 'User ID not found'
  ) {
    console.log(localStorage.getItem('userId'))
    return (
      <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins"
        >
          <p>Você não está logado</p>
        </div>
      </div>
    )
  }

  if (getMyBookingsQuery.isError) {
    return (
      <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
        <div className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins">
          <p>Erro ao carregar reservas: {getMyBookingsQuery.error.message}</p>
        </div>
      </div>
    )
  }
  function reloadBooking(): void {
    fetchBookings()
  }

  return (
    <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
      {isLogged ? (
        <div
          className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-between py-2 md:pt-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-black sm:text-base md:text-xl">
                {user?.name}
              </p>
              <p className="text-sm font-bold text-black sm:text-base md:text-xl">
                {user?.ra}
              </p>
              <IoClose
                className="absolute left-[94%] top-2 h-6 w-6 cursor-pointer md:h-10 md:w-16"
                onClick={handleClose}
              ></IoClose>
            </div>
            <hr className="border-t-4 border-black" />
          </div>
          <div className="flex h-full max-h-[85%] max-w-[70vw] flex-col items-center gap-4 overflow-y-auto">
            {myBookings &&
              (myBookings.length === 0 ? (
                <p className="text-center font-poppins text-sm font-medium text-black md:text-base">
                  Nenhuma reserva encontrada
                </p>
              ) : (
                sortedBookings.map((booking) => (
                  <ReservationCard
                    key={booking.booking_id}
                    startDate={booking.start_date}
                    endDate={booking.end_date}
                    court={booking.court_number.toString()}
                    bookingId={booking.booking_id}
                    reload={reloadBooking}
                  />
                ))
              ))}
            <p className="self-end text-end font-poppins text-xs font-medium text-black md:text-base">
              * Reservas sujeitas a cancelamento
            </p>
          </div>
        </div>
      ) : (
        <div
          className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-between py-2 md:pt-8">
            <div className="flex items-center justify-center">
              <p className="text-sm font-bold text-black sm:text-base md:text-xl">
                Você não está logado
              </p>
              <IoClose
                className="absolute left-[94%] top-2 h-6 w-6 cursor-pointer md:h-10 md:w-16"
                onClick={handleClose}
              ></IoClose>
            </div>
            <div className="flex w-2/3 items-center justify-center">
              <Button
                className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
                onClick={() => {
                  window.location.href = '/login'
                }}
              >
                Fazer login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
