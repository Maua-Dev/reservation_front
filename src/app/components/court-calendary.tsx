import { Button } from './button'
import { CalendaryCard } from './calendary-card'
import { useState } from 'react'
import { Form } from './form'
import { View } from './view'
import { ReservationDetails } from './reservation-details'
import { cn } from '../utils/cn'
import { useUserQuery } from '../hooks/use-user'
import { useBookingsQuery } from '../hooks/use-booking'

export interface Reservation {
  id: number
  court: string
  courtNumber: number
  modality: string
  time: number
  duration: number
  materials: string[]
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

  const { data } = useUserQuery()

  console.log('User data:', data)
  localStorage.setItem('user_id', data?.userId.toString() || '')

  const { getBookingsOfTheWeek } = useBookingsQuery()

  const bookings = getBookingsOfTheWeek?.data?.bookings || []

  const reservas = bookings

  const today = new Date()
  const modalities = [
    'Tennis',
    'Handball',
    'Football',
    'Basketball',
    'Volleyball'
  ]
  const equipments = [
    'Bola de futsal',
    'Bola de handol',
    'Bola de tênis',
    'Bola de vôlei',
    'Raquete de tênis',
    'Bola de basquete',
    'Material Próprio'
  ]

  const startOfTheWeek = () => {
    const now = new Date()
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = now.getDay()
    // Calculate how many days to subtract to get to Monday
    const diffToMonday = (dayOfWeek + 6) % 7
    const monday = new Date(now)
    monday.setDate(now.getDate() - diffToMonday)
    monday.setHours(8, 0, 0, 0)
    return monday.getTime()
  }

  const endOfTheWeek = () => {
    const now = new Date()
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = now.getDay()
    // Calculate how many days to add to get to Sunday
    const diffToSunday = (dayOfWeek + 1) % 7
    const sunday = new Date(now)
    sunday.setDate(now.getDate() + diffToSunday)
    sunday.setHours(23, 59, 59, 999)
    return sunday.getTime()
  }

  localStorage.setItem('end_date', endOfTheWeek().toString())
  localStorage.setItem('start_date', startOfTheWeek().toString())

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

    return sameTimeReservations.size > 1
      ? sameTimeReservations.size > 2
        ? 'xl:w-2/5'
        : 'xl:w-[45%]'
      : 'xl:w-[86%]'
  }

  function handleOpeMyBookings() {
    setIsMyBookingsModalOpen(true)
    setTimeout(() => {
      setIsMyBookingsModalVisible(true)
    }, 100)
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
      // return 'absolute w-20 h-20 left-[30%]'
      case 3:
        return sameTimeReservations.size > 1
          ? sameTimeReservations.size == 2
            ? 'absolute w-20 h-20 left-[25%]'
            : 'absolute w-20 h-20 left-[50%]'
          : 'absolute w-20 h-20 left-[4%]'
      // return 'absolute w-20 h-20 left-[56%]'
      default:
        return 4
    }
  }

  const reservasConvertidas = reservas
    .filter((reserva) =>
      isField ? reserva.court_number === 0 : reserva.court_number !== 0
    )
    .map((reserva) => {
      const date = new Date(Number(reserva.start_date))
      return {
        ...reserva,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        endTime: reserva.end_date
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
    console.log(
      'Timestamp: ',
      new Date(timestamp).toTimeString(),
      new Date(timestamp).toDateString()
    )
    console.log(timestamp)

    if (timestamp < today.getTime()) {
      console.log('Não é possível fazer reservas em horários passados.')
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
    const availableCourts = [1, 2, 3].filter(
      (court) => !occupiedCourts.has(court)
    )

    if (availableCourts.length === 0) {
      console.log(
        'Todas as quadras estão ocupadas neste horário. Não é possível fazer mais reservas.'
      )
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
    }, 200)
  }

  function handleSelectingBooking(booking: Reservation) {
    setSelectedBooking(booking)
    console.log(booking)
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
    <div className="w-full max-w-[100vw]">
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
            <Button onClick={handleOpeMyBookings} className="h-12 w-52 p-1">
              Minhas Reservas
            </Button>
          </div>
        </div>
      </div>

      <div className="sticky top-20 z-[90] mb-12 flex max-w-[100vw] font-poppins text-base font-semibold text-gray-600">
        <div className="w-16 bg-blue-primary p-4 text-xl text-white">Hora</div>
        <div className="flex flex-1 text-center text-lg text-white">
          {thisWeek().map((date, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-xl font-normal"
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
          <div key={index} className="flex">
            <div className="flex min-h-16 min-w-16 max-w-16 items-start border-r border-gray-400 px-4 font-poppins">{`${hour}:${minute === 0 ? '00' : '30'}`}</div>
            <div className="flex flex-1">
              {[...Array(6)].map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  onClick={() =>
                    handleClickedTime(
                      hour,
                      minute,
                      thisWeek()[dayIndex],
                      dayIndex
                    )
                  }
                  className={`relative flex min-w-[90px] max-w-xl flex-1 gap-2 border-b border-r border-gray-400 ${isPassed(thisWeek()[dayIndex], dayIndex, hour, minute) ? 'bg-gray-300' : 'bg-gray-200 hover:cursor-pointer hover:bg-blue-100'} p-2 last:border-r-0`}
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
                              Number(reserva.endTime),
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
                            modality={reserva.sport}
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
                                materials: reserva.materials
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
            modalities={isField ? ['Rugby', 'Football'] : modalities}
            equipments={
              isField
                ? ['Bola de futebol', 'Bola de rugby', 'Material próprio']
                : equipments
            }
            options={
              isField
                ? ['Campo']
                : availableCourts.map((court) => `Quadra ${court}`)
            }
          />
        </div>
      )}
      {isMyBookingsModalOpen && (
        <div
          className={`duration-250 fixed inset-0 z-[999] flex items-center justify-center bg-black/50 transition-all ${isMyBookingsModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
          onClick={() => {
            setIsMyBookingsModalVisible(false)
            setTimeout(() => {
              setIsMyBookingsModalOpen(false)
              window.location.reload()
            }, 200)
          }}
        >
          <View
            onClose={() => {
              setIsMyBookingsModalVisible(false)
              setTimeout(() => {
                setIsMyBookingsModalOpen(false)
              }, 200)
            }}
          />
        </div>
      )}
      {selectedBooking && (
        <div
          className={`duration-250 fixed inset-0 z-[999] flex items-center justify-center bg-black/50 transition-all ${selectedBookingVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
          onClick={() => handleDiselectingBooking()}
        >
          <ReservationDetails
            location={selectedBooking.court}
            modality={selectedBooking.modality}
            equipments={selectedBooking.materials}
            time={selectedBooking.time}
            isChecked={[true, false]}
            onClose={() => handleDiselectingBooking()}
          />
        </div>
      )}
    </div>
  )
}
