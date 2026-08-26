import { IoClose } from 'react-icons/io5'
import { ReservationCard } from './reservation-view'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/use-user'
import { Button } from './button'
import { useBookings, useBookingsQuery } from '../hooks/use-booking'
import { FiLoader } from 'react-icons/fi'
import { sportToDisplay } from '@/utils/enums/sport'
import { courtName } from '../utils/courts'

interface ViewProps {
  onClose: () => void
}

export function MyBookingsAdmin({ onClose }: ViewProps) {
  const { user } = useUser()
  const isLogged = user !== null
  const isAdmin = user?.role === 'ADMIN'
  const [activeTab, setActiveTab] = useState<'ceaf' | 'others'>('ceaf')

  const { getBookingsOfTheWeekAdmin } = useBookingsQuery()
  const { myBookings, setMyBookings } = useBookings()

  const sortedBookings = myBookings
    .slice()
    .sort((a, b) => a.start_date - b.start_date)

  const normalize = (value?: string) =>
    value
      ?.trim()
      .toUpperCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')

  const isCeafBooking = (booking: (typeof sortedBookings)[number]) => {
    const currentRa = normalize(user?.ra)
    const currentName = normalize(user?.name)
    const bookingRa = normalize(booking.owner_network_id)
    const bookingName = normalize(booking.owner_name)

    return Boolean(
      (currentRa && bookingRa && currentRa === bookingRa) ||
      (currentName && bookingName && currentName === bookingName)
    )
  }

  const ceafBookings = sortedBookings.filter(isCeafBooking)
  const otherBookings = sortedBookings.filter(
    (booking) => !isCeafBooking(booking)
  )

  const fetchBookings = async () => {
    const bookings = await getBookingsOfTheWeekAdmin.refetch()
    setMyBookings(bookings.data?.bookings || [])
  }

  useEffect(() => {
    setMyBookings(getBookingsOfTheWeekAdmin.data?.bookings || [])
  }, [getBookingsOfTheWeekAdmin.data, setMyBookings])

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

  if (getBookingsOfTheWeekAdmin.isLoading) {
    return (
      <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
        <div className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins">
          <FiLoader className="animate-spin" />
        </div>
      </div>
    )
  }

  if (
    getBookingsOfTheWeekAdmin.isError &&
    getBookingsOfTheWeekAdmin.error.message == 'User ID not found'
  ) {
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

  if (getBookingsOfTheWeekAdmin.isError) {
    return (
      <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
        <div className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins">
          <p>
            Erro ao carregar reservas: {getBookingsOfTheWeekAdmin.error.message}
          </p>
        </div>
      </div>
    )
  }

  function reloadBooking(): void {
    fetchBookings()
  }

  const displayedBookings = isAdmin
    ? activeTab === 'ceaf'
      ? ceafBookings
      : otherBookings
    : sortedBookings

  return (
    <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
      {isLogged ? (
        <div
          className="relative max-h-[90vh] w-[70vw] max-w-[70vw] rounded-lg bg-white p-4 font-poppins"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-between py-2 md:pt-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-col">
                <p className="break-words text-sm font-bold text-black sm:text-base md:text-xl">
                  {user?.name}
                </p>
              </div>
              <IoClose
                className="absolute left-[94%] top-2 h-6 w-6 cursor-pointer md:h-10 md:w-16"
                onClick={handleClose}
              ></IoClose>
            </div>
            <hr className="border-t-4 border-black" />
          </div>
          <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-scroll">
            {isAdmin && (
              <div className="flex flex-wrap gap-3 border-b border-black/20 pb-3">
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors md:text-base ${activeTab === 'ceaf' ? 'bg-black text-white' : 'bg-black/10 text-black hover:bg-black/20'}`}
                  onClick={() => setActiveTab('ceaf')}
                >
                  CEAF ({ceafBookings.length})
                </button>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors md:text-base ${activeTab === 'others' ? 'bg-black text-white' : 'bg-black/10 text-black hover:bg-black/20'}`}
                  onClick={() => setActiveTab('others')}
                >
                  Outras reservas ({otherBookings.length})
                </button>
              </div>
            )}
            <div className="flex h-full max-h-[85%] min-h-[30vh] max-w-[70vw] flex-col items-center gap-4 overflow-scroll">
              {displayedBookings.length === 0 ? (
                <p className="text-center font-poppins text-sm font-medium text-black md:text-base">
                  Nenhuma reserva encontrada
                </p>
              ) : (
                displayedBookings.map((booking) => (
                  <ReservationCard
                    key={booking.booking_id}
                    startDate={booking.start_date}
                    endDate={booking.end_date}
                    court={courtName(booking.court_number)}
                    bookingId={booking.booking_id}
                    reload={reloadBooking}
                    sport={sportToDisplay(booking.sport)}
                    ownerName={isAdmin ? booking.owner_name : undefined}
                    ownerRa={isAdmin ? booking.owner_network_id : undefined}
                  />
                ))
              )}
              <p className="self-end text-end font-poppins text-xs font-medium text-black md:text-base">
                * Reservas sujeitas a cancelamento
              </p>
            </div>
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
