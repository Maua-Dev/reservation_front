import { Button } from './button'
import { CalendaryCard } from './calendary-card'
import { useEffect, useState } from 'react'
import { Form } from './form'
import { View } from './view'
import { ReservationDetails } from './reservation-details'
import { cn } from '../utils/cn'
import { useUserQuery } from '../hooks/use-user'
import { useBookingsQuery } from '../hooks/use-booking'
import { useIsAuthenticated } from '@azure/msal-react'
import { ModalityName } from '@/utils/enums/modality'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'

export interface Reservation {
  id: number
  court: string
  courtNumber: number
  modality: string
  time: number
  duration: number
  materials: string[]
  userId: string
}

interface CourtProps {
  isField: boolean
}

export function Court({ isField }: CourtProps) {
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
  // const modalities = isField
  //   ? Object.keys(ModalityName).filter(
  //       (mod) => mod === 'Football' || mod === 'Rugby' || mod === 'Beach Tennis'
  //     )
  //   : Object.keys(ModalityName).filter(
  //       (mod) => mod !== 'Football' && mod !== 'Rugby' && mod !== 'Beach Tennis'
  //     )
  const modalities = isField
    ? [ModalityName.Football, ModalityName.Rugby, ModalityName['Beach Tennis']]
    : [
        ModalityName.Tennis,
        ModalityName.Basketball,
        ModalityName.Volleyball,
        ModalityName.Handball,
        ModalityName.Futsal
      ]
  const equipments = [
    'Bola e Raquete de tênis',
    'Bola de basquete',
    'Bola de vôlei',
    'Bola de handebol',
    'Bola de futsal'
  ]

  const startOfTheWeek = () => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const sunday = now.getDate() - dayOfWeek
    const startOfWeek = new Date(now)
    if (sunday < 1) {
      startOfWeek.setMonth(now.getMonth() - 1)
      startOfWeek.setDate(sunday + 31)
      startOfWeek.setHours(0, 0, 0, 0)
    } else {
      startOfWeek.setDate(sunday)
      startOfWeek.setHours(0, 0, 0, 0)
    }
    return startOfWeek.getTime()
  }

  const endOfTheWeek = () => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const nextSunday = now.getDate() + (7 - dayOfWeek)
    const endOfTheWeek = new Date(now)
    if (nextSunday > 31) {
      endOfTheWeek.setMonth(now.getMonth() + 1)
      endOfTheWeek.setDate(nextSunday - 31)
      endOfTheWeek.setHours(0, 0, 0, 0)
    } else {
      endOfTheWeek.setDate(nextSunday)
      endOfTheWeek.setHours(0, 0, 0, 0)
    }
    return endOfTheWeek.getTime()
  }

  const thisWeek = () => {
    const week = []
    for (let i = 1; i <= 6; i++) {
      const day = new Date(today)
      day.setDate(today.getDate() - today.getDay() + i)
      week.push(day.getDate())
    }
    return week
  }

  const specialWidth = (timestamp: number, endTime: number, day: number) => {
    const sameTimeReservations = new Set()

    reservasConvertidas
      .filter((reserva) => Number(reserva.day) === day)
      .forEach((reserva) => {
        if (
          (timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
          (endTime <= reserva.end_date && endTime > reserva.start_date)
        ) {
          sameTimeReservations.add(reserva.court_number)
        }
      })

    if (isField) {
      return sameTimeReservations.size > 1 ? 'xl:w-[50%]' : 'xl:w-[86%]'
    }

    return sameTimeReservations.size > 1
      ? sameTimeReservations.size > 2
        ? 'xl:w-2/5'
        : 'xl:w-[45%]'
      : 'xl:w-[86%]'
  }

  function handleOpeMyBookings() {
    if (isMyBookingsModalOpen) return
    setIsMyBookingsModalOpen(true)
    setTimeout(() => {
      setIsMyBookingsModalVisible(true)
    }, 100)
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
    day: number
  ) => {
    const sameTimeReservations = new Set()

    reservasConvertidas
      .filter((reserva) => Number(reserva.day) === day)
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
      isField
        ? reserva.court_number === 0 || reserva.court_number === 6
        : reserva.court_number !== 0 && reserva.court_number !== 6
    )
    .map((reserva) => {
      const date = new Date(Number(reserva.start_date))
      return {
        ...reserva,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
      }
    })

  const isPassed = (
    day: number,
    weekday: number,
    hour: number,
    minute: number
  ) => {
    const date = new Date()
    if (day < today.getDate() && weekday > today.getDay() - 1) {
      // esse -1 é por conta do Date(), ele começar com o index 0 no domingo, no nosso caso, é a segunda
      date.setMonth(today.getMonth() + 1)
      if (today.getMonth() === 11) {
        date.setFullYear(today.getFullYear() + 1)
        date.setMonth(0)
      }
    } else {
      date.setMonth(today.getMonth())
      date.setFullYear(today.getFullYear())
    }

    date.setDate(day)
    date.setHours(hour)
    date.setMinutes(minute === 0 ? 0 : 30)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date.getTime() < today.getTime()
  }

  const cannotReserve = (day: number, hour: number, minute: number) => {
    const userId = localStorage.getItem('user_id')

    const userReservations = reservasConvertidas.filter(
      (reserva) => reserva.user_id === userId && reserva.day === day
    )

    const tryingDate = new Date()
    tryingDate.setDate(day)
    tryingDate.setHours(hour)
    tryingDate.setMinutes(minute === 0 ? 0 : 30)

    const timestamp = tryingDate.getTime()

    return userReservations.some((reserva) => {
      // Verifica se o horário desejado está dentro da janela de 1 hora antes ou depois
      return (
        (timestamp >= reserva.start_date - 90 * 60 * 1000 &&
          timestamp < reserva.start_date) || // 1h antes
        (timestamp >= reserva.end_date &&
          timestamp < reserva.end_date + 60 * 60 * 1000) || // 1h depois
        (timestamp >= reserva.start_date && timestamp < reserva.end_date) // Dentro do horário reservado
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

  function handleClickedTime(
    hour: number,
    minute: number,
    day: number,
    weekday: number
  ) {
    const clickedTime = new Date()
    if (day < today.getDate() && weekday > today.getDay() - 1) {
      // esse -1 é por conta do Date(), ele começar com o index 0 no domingo, no nosso caso, é a segunda
      clickedTime.setMonth(today.getMonth() + 1)
      if (today.getMonth() === 11) {
        clickedTime.setFullYear(today.getFullYear() + 1)
        clickedTime.setMonth(0) // Janeiro
      }
    } else {
      clickedTime.setMonth(today.getMonth())
      clickedTime.setFullYear(today.getFullYear())
    }

    clickedTime.setDate(day)
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
        reserva.day === day &&
        timestamp < reserva.end_date &&
        timestamp >= reserva.start_date
      ) {
        occupiedCourts.add(reserva.court_number)
      }
    })
    const allCourts = isField ? [0, 6] : [1, 2, 3]
    const availableCourts = allCourts.filter((court) => {
      const reservasDaQuadra = reservasConvertidas.filter(
        (reserva) => reserva.court_number === court && reserva.day === day
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

  return (
    <div className="relative w-full min-w-[100vw] sm:max-w-[100vw]">
      {getBookingsOfTheWeek?.isLoading && (
        <div className="absolute inset-0 z-[60] flex h-full w-full justify-center bg-white/20 pt-[30%] backdrop-blur-sm">
          <FiLoader className="animate-spin" color="black" size={64} />
        </div>
      )}
      <div
        className={`relative h-44 w-full ${isField ? 'bg-campo' : 'bg-quadra'} bg-cover bg-center`}
      >
        <div className="h-full w-full bg-black/50">
          <div className="absolute bottom-0 left-0 p-5 font-poppins text-white">
            <p className="text-3xl font-semibold">
              {isField ? 'Campo' : 'Quadras'}
            </p>
            <p className="text-2xl font-normal">
              {today
                .toLocaleDateString('pt-BR', { month: 'long' })
                .charAt(0)
                .toUpperCase() +
                today
                  .toLocaleDateString('pt-BR', { month: 'long' })
                  .slice(1)}{' '}
              {thisWeek()[0]}-{thisWeek()[5]}
            </p>
          </div>
          <div className="absolute bottom-0 right-0 p-8">
            {isAuth && (
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
            {thisWeek().map((date, index) => (
              <div
                key={index}
                className="flex min-w-[120px] flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-xl font-normal sm:min-w-[90px]"
              >
                <div>{date}</div>
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
          const isHourSeparator = minute === 0
          return (
            <div key={index} className="flex min-w-[100vw] sm:min-w-0">
              <div className="sticky left-0 z-20 flex min-h-16 min-w-16 max-w-16 items-start border-r border-gray-400 bg-white px-4 font-poppins">{`${hour}:${minute === 0 ? '00' : '30'}`}</div>
              <div className="flex flex-1">
                {[...Array(6)].map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    title={
                      isPassed(thisWeek()[dayIndex], dayIndex, hour, minute)
                        ? 'Esse horário já passou'
                        : cannotReserve(thisWeek()[dayIndex], hour, minute)
                          ? 'Você não pode reservar dentro de uma hora de outra reserva sua'
                          : ''
                    }
                    onClick={() =>
                      isPassed(thisWeek()[dayIndex], dayIndex, hour, minute)
                        ? toast.info('Esse horário já passou')
                        : cannotReserve(thisWeek()[dayIndex], hour, minute)
                          ? toast.info(
                              'Você não pode reservar dentro de uma hora de outra reserva sua'
                            )
                          : isLastHalfHour(hour, minute)
                            ? toast.info(
                                'Esse horário não está disponível para reserva'
                              )
                            : handleClickedTime(
                                hour,
                                minute,
                                thisWeek()[dayIndex],
                                dayIndex
                              )
                    }
                    className={`relative flex min-w-[120px] max-w-xl flex-1 gap-2 border-b border-r border-gray-400 sm:min-w-[90px] ${isPassed(thisWeek()[dayIndex], dayIndex, hour, minute) ? 'bg-gray-300' : cannotReserve(thisWeek()[dayIndex], hour, minute) ? 'bg-gray-300' : isLastHalfHour(hour, minute) ? 'bg-gray-300' : 'bg-gray-200 hover:cursor-pointer hover:bg-blue-100'} p-2 last:border-r-0`}
                    style={{
                      borderBottomStyle: isHourSeparator ? 'dashed' : 'solid',
                      borderRightStyle: 'solid'
                    }}
                  >
                    {reservasConvertidas.map((reserva) => {
                      if (
                        reserva.hour === hour &&
                        reserva.minute === (minute == 1 ? 30 : 0) &&
                        reserva.day === thisWeek()[dayIndex]
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
                                thisWeek()[dayIndex]
                              ),
                              deslocation(
                                reserva.court_number,
                                Number(reserva.start_date),
                                Number(reserva.end_date),
                                thisWeek()[dayIndex]
                              )
                            )}
                            style={{
                              height: `${1 * 50 * 2}px`
                            }}
                          >
                            <CalendaryCard
                              court={reserva.court_number}
                              location={`Quadra ${reserva.court_number}`}
                              modality={
                                ModalityName[
                                  reserva.sport as keyof typeof ModalityName
                                ]
                              }
                              equipments={equipments}
                              time={reserva.start_date}
                              isChecked={[true, false]}
                              openModal={() =>
                                handleSelectingBooking({
                                  id: Number(reserva.booking_id) ?? 0,
                                  court: `Quadra ${reserva.court_number}`,
                                  courtNumber: reserva.court_number,
                                  modality: reserva.sport,
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
                ))}
              </div>
            </div>
          )
        })}
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
              modalities={modalities}
              isField={isField}
              equipments={
                isField
                  ? [
                      'Bola de futebol',
                      'Bola de rugby',
                      'Raquete de beach ou Tamboréu'
                    ]
                  : equipments
              }
              options={availableCourts.map((court) =>
                isField ? (court === 6 ? `Beach` : `Campo`) : `Quadra ${court}`
              )}
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
              modality={
                ModalityName[
                  selectedBooking.modality as keyof typeof ModalityName
                ]
              }
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
