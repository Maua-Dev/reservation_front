import { useEffect } from 'react'
import { useBookingsQuery } from '../hooks/use-booking'
import { IoClose } from 'react-icons/io5'
import { useUser } from '../hooks/use-user'
import { Button } from './button'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'

type ReservationDetailsProps = {
  location: string
  sport: string
  equipments: string[]
  time: number
  isChecked: boolean[]
  onClose: () => void
  bookingUserId?: string
  bookingId: string
  //reload: () => void
  name?: string
  ra?: string
}

export const ReservationDetails = ({
  equipments,
  location,
  sport,
  time,
  bookingId,
  //isChecked,
  onClose,
  name,
  ra
}: ReservationDetailsProps) => {
  const { deleteBookingMutation, getBookingsOfTheWeek, getMyBookingsQuery } =
    useBookingsQuery()
  const date = new Date(time)
  const { user } = useUser()
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  })
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }) // Format time as HH:MM

  //const isPassed = startDate < today

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

  const handleCancel = async () => {
    if (bookingId) {
      try {
        await deleteBookingMutation.mutateAsync(bookingId)
        getBookingsOfTheWeek.refetch()
        onClose()
        // If you have a refetch function, call it here. Otherwise, remove this block.
        // setTimeout(() => {
        //   getBookingsOfTheWeek.refetch()
        // }, 800)
      } catch (err) {
        toast.error('Erro ao cancelar reserva!')
        console.error(err)
      }
    } else {
      toast.error('ID da reserva não encontrado!')
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-white p-8">
        <p className="font-poppins text-xl text-red-500">
          Usuário não encontrado. Por favor, faça login novamente.
        </p>
      </div>
    )
  }

  const normalize = (value?: string) =>
    value
      ?.trim()
      .toUpperCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')

  // Verificamos se a reserva atual consta na lista de reservas do próprio usuário ou bate com o RA/Nome dele
  const userBookings = getMyBookingsQuery.data?.bookings || []

  const isOwnReservation = userBookings.some((booking) => {
    return bookingId === booking.booking_id
  })

  const shouldShowOwnerInfo =
    (user.role === 'ADMIN' && !isOwnReservation) ||
    (user.role != 'ADMIN' && isOwnReservation)

  return (
    <>
      <div
        className={`relative max-h-[90vh] w-[90%] max-w-[70vw] overflow-y-auto overflow-x-hidden rounded-xl bg-white text-slate-700 shadow-lg sm:w-[70%]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-5 tracking-wide">
          <div className="flex flex-col justify-between border-b-2 border-slate-700 pb-4">
            <IoClose
              className="absolute right-2 top-2 h-8 w-8 cursor-pointer md:h-10 md:w-16"
              onClick={onClose}
            ></IoClose>
            {shouldShowOwnerInfo && (name || ra) && (
              <div className="mt-1 flex flex-col gap-1 font-poppins">
                {name && name !== user.name && (
                  <p className="text-2xl font-medium">{name}</p>
                )}
                {ra && name !== user.name && (
                  <p className="text-lg font-medium text-slate-600">RA: {ra}</p>
                )}
              </div>
            )}
            {shouldShowOwnerInfo && user.role != 'ADMIN' && (
              <div className="mt-1 flex flex-col gap-1 font-poppins">
                <p className="text-2xl font-medium">{user.name}</p>
                <p className="text-lg font-medium text-slate-600">
                  RA: {user.ra}
                </p>
              </div>
            )}
            <p className="mt-1 font-poppins text-2xl font-medium">
              Data: {formattedDate}
            </p>
          </div>
          <div className="flex w-full flex-col justify-start gap-10 font-poppins text-xl font-medium text-white lg:flex-row">
            <h1 className="inline-flex h-16 items-center justify-center text-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4">
              {location.split(' ')[1] === '0'
                ? 'Campo'
                : location.split(' ')[1] === '6'
                  ? 'Beach'
                  : location.split(' ')[1] === '5'
                    ? 'Atividades Livres'
                    : location}
            </h1>
            <h1 className="inline-flex h-16 w-60 items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4">
              Horário: {formattedTime} -{' '}
              {new Date(date.getTime() + 60 * 60 * 1000).toLocaleTimeString(
                'pt-BR',
                { hour: '2-digit', minute: '2-digit' }
              )}
            </h1>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-start">
              <p className="text-left font-poppins text-2xl font-bold">
                Modalidade:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 text-xl">
              <h1
                className={
                  'inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4 font-poppins text-lg font-medium text-white md:text-xl'
                }
              >
                {sport}
              </h1>
            </div>
          </div>

          <div className="flex flex-row items-end justify-between">
            <div className="flex flex-col">
              <div className="flex justify-start">
                <p className="text-left font-poppins text-2xl font-bold">
                  Equipamentos:
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex flex-wrap gap-2 pt-3">
                  {equipments?.map((equipment) => (
                    <h1
                      key={equipment}
                      className={
                        'inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2 px-8 py-4 text-center font-poppins text-lg font-medium text-white md:text-xl'
                      }
                    >
                      {equipment}
                    </h1>
                  ))}
                </div>
              </div>
            </div>
            {user?.role === 'ADMIN' && (
              <div className="ml-4 flex items-center">
                <Button
                  className="inline-flex h-16 items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow px-4 py-4 text-center font-poppins text-lg font-medium text-white hover:border-red-600 hover:bg-red-500 md:text-xl"
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
            )}
          </div>
          {/* <div className="mt-3 flex flex-row items-center gap-2">
            <div
              className={`size-8 rounded border border-slate-400 p-1 md:w-8 ${isChecked?.[0] ? 'bg-yellow' : 'bg-white'}`}
            />
            <p className="text-md font-poppins font-medium md:text-xl">
              Preciso de colete
            </p>
          </div>

          <div className="mt-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`size-8 rounded border border-slate-500 p-1 md:w-8 ${isChecked?.[1] ? 'bg-yellow' : 'bg-white'}`}
              />
              <p className="text-md font-poppins font-medium md:text-xl">
                Aceito compartilhar quadra
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
