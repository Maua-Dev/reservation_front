import { Button } from './button'
import { CalendaryCard } from './calendary-card'
import { useEffect, useState } from 'react'
import { Form } from './form'
import { View } from './view'
import { ReservationDetails } from './reservation-details'
import { cn } from '../utils/cn'
import { useUserQuery } from '../hooks/use-user'
import { useBookingsQuery, useBookings } from '../hooks/use-booking'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { SportName, sportToDisplay } from '@/utils/enums/sport'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'
//import { any } from 'zod'

export interface Reservation {
  id: number
  court: string
  courtNumber: number
  sport: string
  time: number
  duration: number
  materials: string[]
  userId: string
}

interface CourtProps {
  isField: boolean
  isQuadra5?: boolean
}

export function Court({ isField, isQuadra5 }: CourtProps) {
  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false)
  const [isMyBookingsModalVisible, setIsMyBookingsModalVisible] =
    useState(false)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<
    Reservation | undefined
  >(undefined)
  const [selectedBookingVisible, setSelectedBookingVisible] = useState(false)
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [availableCourts, setAvailableCourts] = useState<number[]>([])
  const isAuth = useIsAuthenticated()

  const { data } = useUserQuery()

  useEffect(() => {
    if (data?.userId) {
      localStorage.setItem('user_id', data.userId.toString())
    }
  }, [data?.userId])

  useEffect(() => {
    fetchAccessToken()
    localStorage.setItem('end_date', endOfTheWeek().toString())
    localStorage.setItem('start_date', startOfTheWeek().toString())
  }, [])

  const { getBookingsOfTheWeek } = useBookingsQuery()

  const bookings = getBookingsOfTheWeek?.data?.bookings || []
  let reservas = bookings

  const fetchBookingsOfTheWeek = async () => {
    const result = await getBookingsOfTheWeek?.refetch()
    if (result && 'data' in result && result.data?.bookings) {
      reservas = result.data.bookings
    }
  }

  const today = new Date()

  const sports = isField
    ? [
        SportName.FOOTBALL,
        SportName.RUGBY,
        SportName.BEACH_TENNIS
        //SportName.CORRIDA,
        //SportName.NATACAO,
        //SportName.PING_PONG
      ]
    : [
        SportName.TENNIS,
        SportName.BASKETBALL,
        SportName.VOLLEYBALL,
        SportName.HANDBOLL,
        SportName.FUTSAL
      ]
  const equipments = [
    'Bola e Raquete de tênis',
    'Bola de basquete',
    'Bola de vôlei',
    'Bola de handebol',
    'Bola de futsal'
  ]

  const { instance } = useMsal()

  const fetchAccessToken = async () => {
    const accounts = instance.getAllAccounts()
    if (accounts.length === 0) return
    const accessToken = (
      await instance.acquireTokenSilent({
        scopes: ['User.Read'],
        account: accounts[0]
      })
    ).accessToken
    localStorage.setItem('accessToken', accessToken)
    return accessToken
  }

  const startOfTheWeek = () => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    return startOfWeek.getTime()
  }

  const endOfTheWeek = () => {
    const now = new Date()
    const endOfTheWeek = new Date(now)
    endOfTheWeek.setDate(now.getDate() + (7 - now.getDay()))
    endOfTheWeek.setHours(0, 0, 0, 0)
    return endOfTheWeek.getTime()
  }

  const thisWeek = () => {
    const week: Date[] = []
    for (let i = 1; i <= 6; i++) {
      const day = new Date(today)
      day.setDate(today.getDate() - today.getDay() + i)
      day.setHours(0, 0, 0, 0)
      week.push(day)
    }
    return week
  }

  const getDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  const isOutsideCurrentMonth = (date: Date) => {
    return (
      date.getMonth() !== today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    )
  }

  const specialWidth = (timestamp: number, endTime: number, dayKey: string) => {
    const sameTimeReservations = new Set()

    reservasConvertidas
      .filter((reserva) => reserva.dayKey === dayKey)
      .forEach((reserva) => {
        if (
          (timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
          (endTime <= reserva.end_date && endTime > reserva.start_date)
        ) {
          sameTimeReservations.add(reserva.court_number)
        }
      })

    if (isField) {
      return sameTimeReservations.size > 1
        ? 'w-[50%] xl:w-[50%]'
        : 'w-[86%] xl:w-[86%]'
    }

    return sameTimeReservations.size > 1
      ? sameTimeReservations.size > 2
        ? 'w-2/5 xl:w-2/5'
        : 'w-[45%] xl:w-[45%]'
      : 'w-[86%] xl:w-[86%]'
  }

  const handleCloseMyBookings = () => {
    setIsMyBookingsModalVisible(false)
    setTimeout(() => {
      setIsMyBookingsModalOpen(false)
      fetchBookingsOfTheWeek()
    }, 200)
  }

  const deslocation = (
    courtNumber: number,
    timestamp: number,
    endTime: number,
    dayKey: string
  ) => {
    const sameTimeReservations = new Set()

    reservasConvertidas
      .filter((reserva) => reserva.dayKey === dayKey)
      .forEach((reserva) => {
        if (
          (timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
          (endTime <= reserva.end_date && endTime > reserva.start_date)
        ) {
          sameTimeReservations.add(reserva.court_number)
        }
      })

    if (isField) {
      // Campo: court_number 0 (Campo) e 6 (Beach)
      switch (courtNumber) {
        case 0:
          // Campo principal
          return 'absolute w-20 h-20 left-[4%]'
        case 6:
          // Beach Tennis
          return sameTimeReservations.size > 1
            ? 'absolute w-20 h-20 left-[45%]'
            : 'absolute w-20 h-20 left-[4%]'

        default:
          return ''
      }
    }

    // Quadras normais
    const isItOne = sameTimeReservations.has(1)
    switch (courtNumber) {
      case 1:
        return 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[4%]'
      case 2:
        return sameTimeReservations.size > 1
          ? sameTimeReservations.size == 2
            ? isItOne
              ? 'absolute w-20 h-20 left-[46%]'
              : 'absolute w-20 h-20 left-[4%]'
            : 'absolute w-20 h-20 left-[25%]'
          : 'absolute w-20 h-20 left-[4%]'
      case 3:
        return sameTimeReservations.size > 1
          ? sameTimeReservations.size == 2
            ? 'absolute w-20 h-20 left-[25%]'
            : 'absolute w-20 h-20 left-[50%]'
          : 'absolute w-20 h-20 left-[4%]'
      default:
        return ''
    }
  }

  const reservasConvertidas = reservas
    .filter((reserva) =>
      isQuadra5
        ? reserva.court_number === 5
        : isField
          ? [0, 6].includes(reserva.court_number)
          : reserva.court_number !== 0 &&
            reserva.court_number !== 6 &&
            reserva.court_number !== 5
    )
    .map((reserva) => {
      const date = new Date(Number(reserva.start_date))
      return {
        ...reserva,
        day: date.getDate(),
        dayKey: getDateKey(date),
        hour: date.getHours(),
        minute: date.getMinutes()
      }
    })

  const isPassed = (dayDate: Date, hour: number, minute: number) => {
    const date = new Date(dayDate)
    date.setHours(hour)
    date.setMinutes(minute === 0 ? 0 : 30)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date.getTime() < today.getTime()
  }
  const { getMyBookingsQuery } = useBookingsQuery()

  const { myBookings, setMyBookings } = useBookings()

  //const fetchBookings = async () => {
  //  const bookings = await getMyBookingsQuery.refetch()
  //  setMyBookings(bookings.data?.bookings || [])
  // }
  useEffect(() => {
    setMyBookings(getMyBookingsQuery.data?.bookings || [])
  }, [getMyBookingsQuery.data, setMyBookings])

  function handleOpeMyBookings() {
    if (isMyBookingsModalOpen) return
    // ensure latest data
    try {
      getMyBookingsQuery.refetch()
    } catch (e) {
      // ignore
    }
    setIsMyBookingsModalOpen(true)
    setTimeout(() => {
      setIsMyBookingsModalVisible(true)
    }, 100)
  }

  const cannotReserve = (dayDate: Date, hour: number, minute: number) => {
    if (!myBookings || myBookings.length === 0) return false
    const dayKey = getDateKey(dayDate)

    // Pega os IDs das reservas do usuário para o dia específico
    // Primeiro converte myBookings para o mesmo formato de reservasConvertidas
    const userReservations = myBookings
      .map((booking) => {
        const date = new Date(Number(booking.start_date))
        return {
          ...booking,
          day: date.getDate(),
          dayKey: getDateKey(date),
          hour: date.getHours(),
          minute: date.getMinutes(),
          startDate: Number(booking.start_date),
          endDate: Number(booking.end_date)
        }
      })
      .filter((reserva) => reserva.dayKey === dayKey)

    if (userReservations.length === 0) return false

    const tryingDate = new Date(dayDate)
    tryingDate.setHours(hour)
    tryingDate.setMinutes(minute === 0 ? 0 : 30)
    tryingDate.setSeconds(0)
    tryingDate.setMilliseconds(0)

    const timestamp = tryingDate.getTime()

    return userReservations.some((reserva) => {
      // Verifica se o horário desejado está dentro da janela de 1 hora antes ou depois
      return (
        (timestamp >= reserva.startDate - 90 * 60 * 1000 &&
          timestamp < reserva.startDate) || // 1h antes
        (timestamp >= reserva.endDate &&
          timestamp < reserva.endDate + 60 * 60 * 1000) || // 1h depois
        (timestamp >= reserva.startDate && timestamp < reserva.endDate) // Dentro do horário reservado
      )
    })
  }

  const isLastHalfHour = (hour: number, minute: number) => {
    if (isField) {
      return hour === 17 && minute === 0
    } else {
      return hour === 20 && minute === 1
    }
  }

  function handleClickedTime(hour: number, minute: number, dayDate: Date) {
    const dayKey = getDateKey(dayDate)
    const clickedTime = new Date(dayDate)
    clickedTime.setHours(hour)
    clickedTime.setMinutes(minute === 0 ? 0 : 30)
    clickedTime.setSeconds(0)
    clickedTime.setMilliseconds(0)

    const timestamp = clickedTime.getTime()
    const oneHourLater = timestamp + 60 * 60 * 1000

    if (timestamp < today.getTime()) {
      return
    }

    const occupiedCourts = new Set<number>()
    reservasConvertidas.forEach((reserva) => {
      if (
        reserva.dayKey === dayKey &&
        timestamp < reserva.end_date &&
        timestamp >= reserva.start_date
      ) {
        occupiedCourts.add(reserva.court_number)
      }
    })
    const allCourts = isQuadra5 ? [5] : isField ? [0, 6] : [1, 2, 3]
    const availableCourts = allCourts.filter((court) => {
      const reservasDaQuadra = reservasConvertidas.filter(
        (reserva) => reserva.court_number === court && reserva.dayKey === dayKey
      )
      const hasConflict = reservasDaQuadra.some(
        (reserva) =>
          reserva.start_date < oneHourLater && reserva.end_date > timestamp
      )
      return !hasConflict
    })
    if (availableCourts.length === 0) {
      return
    }
    setAvailableCourts(availableCourts)
    setSelectedTime(timestamp)
    handleOpenModal()
  }

  function handleOpenModal() {
    setIsReservationModalOpen(true)
    setTimeout(() => {
      setBookingModalVisible(true)
    }, 100)
  }

  function handleCloseModal() {
    setBookingModalVisible(false)
    setTimeout(() => {
      setIsReservationModalOpen(false)
      fetchBookingsOfTheWeek()
    }, 200)
  }

  function handleSelectingBooking(booking: Reservation) {
    setSelectedBooking(booking)
    setTimeout(() => {
      setSelectedBookingVisible(true)
    }, 100)
  }

  function handleDiselectingBooking() {
    setSelectedBookingVisible(false)
    setTimeout(() => {
      setSelectedBooking(undefined)
    }, 200)
  }

  const weekDays = thisWeek()

  return (
    <div className="relative w-full">
      {getBookingsOfTheWeek?.isLoading && (
        <div className="absolute inset-0 z-[60] flex h-full w-full justify-center bg-white/20 pt-[30%] backdrop-blur-sm">
          <FiLoader className="animate-spin" color="black" size={64} />
        </div>
      )}
      <div
        className={`relative h-44 w-full ${isField ? 'bg-campo' : 'bg-quadra'} bg-cover bg-center`}
      >
        <div className="flex h-full w-full flex-col bg-black/50 md:flex-row">
          <div className="bottom-0 left-0 p-5 font-poppins text-white md:absolute">
            <p className="text-3xl font-semibold">
              {isQuadra5 ? 'Atividades Livres' : isField ? 'Campo' : 'Quadras'}
            </p>
            <p className="text-2xl font-normal">
              {today
                .toLocaleDateString('pt-BR', { month: 'long' })
                .charAt(0)
                .toUpperCase() +
                today
                  .toLocaleDateString('pt-BR', { month: 'long' })
                  .slice(1)}{' '}
              {weekDays[0].getDate()}-{weekDays[5].getDate()}
            </p>
          </div>
          <div className="bottom-0 right-0 p-2 md:absolute md:p-8">
            {(isAuth || data?.role === 'ADMIN') && (
              <Button onClick={handleOpeMyBookings} className="h-12 w-52 p-1">
                Minhas Reservas
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[100vw] max-sm:overflow-x-scroll">
        <div className="sticky top-0 z-50 mb-12 flex w-full bg-red-300 font-poppins text-base font-semibold text-gray-600 sm:top-[88px] sm:max-w-[100vw]">
          <div className="sticky left-0 min-w-16 max-w-16 bg-blue-primary px-2 py-4 text-xl text-white">
            Hora
          </div>
          <div className="flex flex-1 text-center text-lg text-white">
            {weekDays.map((date, index) => (
              <div
                key={index}
                className="flex min-w-[120px] flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-xl font-normal sm:min-w-[90px]"
              >
                <div>{date.getDate()}</div>
                <div>
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                </div>{' '}
              </div>
            ))}
          </div>
        </div>
        {[...Array(isField ? 18 : 25)].map((_, index) => {
          const hour = 8 + Math.floor((index + 1) / 2)
          const minute = (index + 1) % 2
          return (
            <div key={index} className="flex min-w-[100vw] sm:min-w-0">
              <div className="sticky left-0 z-20 flex min-h-16 min-w-16 max-w-16 items-start border-r border-gray-400 bg-white px-4 font-poppins">{`${hour}:${minute === 0 ? '00' : '30'}`}</div>
              <div className="flex flex-1">
                {weekDays.map((weekDay, dayIndex) => {
                  const weekDayKey = getDateKey(weekDay)
                  const isOutsideMonth = isOutsideCurrentMonth(weekDay)
                  const passedTime = isPassed(weekDay, hour, minute)
                  const reserveBlocked = cannotReserve(weekDay, hour, minute)

                  return (
                    <div
                      key={dayIndex}
                      title={
                        isOutsideMonth
                          ? 'Dias fora do mês atual não estão disponíveis'
                          : passedTime
                            ? 'Esse horário já passou'
                            : reserveBlocked
                              ? 'Você não pode reservar dentro de uma hora de outra reserva sua'
                              : ''
                      }
                      onClick={() =>
                        !isAuth
                          ? toast.error(
                              'Você precisa estar logado para reservar'
                            )
                          : isOutsideMonth
                            ? toast.info(
                                'Dias fora do mês atual não estão disponíveis'
                              )
                            : passedTime
                              ? toast.info('Esse horário já passou')
                              : reserveBlocked
                                ? toast.info(
                                    'Você não pode reservar dentro de uma hora de outra reserva sua'
                                  )
                                : isLastHalfHour(hour, minute)
                                  ? toast.info(
                                      'Esse horário não está disponível para reserva'
                                    )
                                  : handleClickedTime(hour, minute, weekDay)
                      }
                      className={`relative flex min-w-[120px] max-w-xl flex-1 gap-2 border-b border-r border-gray-400 sm:min-w-[90px] ${isOutsideMonth || passedTime || reserveBlocked || isLastHalfHour(hour, minute) ? 'bg-gray-300' : 'bg-gray-200 hover:cursor-pointer hover:bg-blue-100'} p-2 last:border-r-0`}
                    >
                      {reservasConvertidas.map((reserva) => {
                        if (
                          reserva.hour === hour &&
                          reserva.minute === (minute == 1 ? 30 : 0) &&
                          reserva.dayKey === weekDayKey
                        ) {
                          return (
                            <div
                              key={reserva.booking_id}
                              onClick={(e) => e.stopPropagation()}
                              className={cn(
                                'absolute flex',
                                specialWidth(
                                  Number(reserva.start_date),
                                  Number(reserva.end_date),
                                  weekDayKey
                                ),
                                deslocation(
                                  reserva.court_number,
                                  Number(reserva.start_date),
                                  Number(reserva.end_date),
                                  weekDayKey
                                )
                              )}
                              style={{
                                // altura dinâmica do bloco: 50px por meia hora (slot base)
                                height: `${((reserva.end_date - reserva.start_date) / (1000 * 60 * 30)) * 50}px`
                              }}
                            >
                              <CalendaryCard
                                court={reserva.court_number}
                                location={`Quadra ${reserva.court_number}`}
                                sport={sportToDisplay(reserva.sport)}
                                equipments={equipments}
                                time={reserva.start_date}
                                isChecked={[true, false]}
                                openModal={() =>
                                  handleSelectingBooking({
                                    id: Number(reserva.booking_id) ?? 0,
                                    court: `Quadra ${reserva.court_number}`,
                                    courtNumber: reserva.court_number,
                                    sport: reserva.sport,
                                    time: reserva.start_date,
                                    duration:
                                      (reserva.end_date - reserva.start_date) /
                                      (1000 * 60 * 60),
                                    materials: reserva.materials,
                                    userId: reserva.user_id ?? ''
                                  })
                                }
                              />
                            </div>
                          )
                        }
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        {/* <div className="mt-16 border-t-4 border-blue-primary pt-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Atividades Livres
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings
              .filter((reserva) => extraCourts.includes(reserva.court_number))
              .map((reserva) => (
                <CalendaryCard
                  key={reserva.booking_id}
                  court={reserva.court_number}
                  location={`Atividade Livres ${reserva.court_number}`}
                  sport={sportToDisplay(reserva.sport)}
                  equipments={equipments}
                  time={reserva.start_date}
                  isChecked={[true, false]}
                  openModal={() =>
                    handleSelectingBooking({
                      id: Number(reserva.booking_id) ?? 0,
                      court: `Quadra Especial ${reserva.court_number}`,
                      courtNumber: reserva.court_number,
                      sport: reserva.sport,
                      time: reserva.start_date,
                      duration:
                        (reserva.end_date - reserva.start_date) /
                        (1000 * 60 * 60),
                      materials: reserva.materials,
                      userId: reserva.user_id ?? ''
                    })
                  }
                />
              ))}
          </div>
        </div> */}
        {isReservationModalOpen && selectedTime && (
          <div
            className={`duration-250 fixed inset-0 z-[100] flex items-center justify-center bg-black/50 transition-all ${bookingModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
            onClick={handleCloseModal}
          >
            <Form
              isOpen={isReservationModalOpen}
              onClose={handleCloseModal}
              timestamp={selectedTime}
              // se for field, soh vai ter football e rugby
              sports={sports}
              isField={isField}
              equipments={
                isField
                  ? [
                      'Bola de futebol',
                      'Bola de rugby',
                      'Raquete de beach e Bola'
                    ]
                  : equipments
              }
              options={
                isQuadra5
                  ? ['Atividades Livres']
                  : isField
                    ? availableCourts.map((court) =>
                        court === 6 ? 'Beach' : 'Campo'
                      )
                    : availableCourts.map((court) => `Quadra ${court}`)
              }
            />
          </div>
        )}
        {isMyBookingsModalOpen && (
          <div
            className={`duration-250 fixed inset-0 z-[999] flex items-center justify-center bg-black/50 transition-all ${isMyBookingsModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
            onClick={handleCloseMyBookings}
          >
            <View onClose={handleCloseMyBookings} />
          </div>
        )}
        {selectedBooking && (
          <div
            className={`duration-250 fixed inset-0 z-[999] flex items-center justify-center bg-black/50 transition-all ${selectedBookingVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
            onClick={() => handleDiselectingBooking()}
          >
            <ReservationDetails
              location={selectedBooking.court}
              sport={sportToDisplay(selectedBooking.sport)}
              equipments={selectedBooking.materials}
              time={selectedBooking.time}
              isChecked={[true, false]}
              onClose={() => handleDiselectingBooking()}
              bookingUserId={selectedBooking.userId}
            />
          </div>
        )}
      </div>
    </div>
  )
}
