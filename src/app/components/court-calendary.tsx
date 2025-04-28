import { Button } from './button'
import { CalendaryCard } from './calendary-card'
import { useState } from 'react'
import { Form } from './form'
import { View } from './view'
import { ReservationDetails } from './reservation-details'
import { cn } from '../utils/cn'

const reservas = [
  // Caso com 1 reserva
  {
    id: 1,
    court: 'Quadra 1',
    courtNumber: 1,
    modality: 'Basquete',
    time: new Date(2025, 3, 26, 10, 0).getTime(), // 26/04 10:00
    duration: 1
  },

  // Caso com 2 reservas no mesmo horário
  {
    id: 2,
    court: 'Quadra 2',
    courtNumber: 2,
    modality: 'Vôlei',
    time: new Date(2025, 3, 26, 11, 0).getTime(), // 26/04 11:00
    duration: 1
  },
  {
    id: 3,
    court: 'Quadra 3',
    courtNumber: 3,
    modality: 'Futsal',
    time: new Date(2025, 3, 26, 11, 0).getTime(), // 26/04 11:00
    duration: 1
  },

  // Caso com 3 reservas no mesmo horário (manhã)
  {
    id: 4,
    court: 'Quadra 1',
    courtNumber: 1,
    modality: 'Vôlei',
    time: new Date(2025, 3, 26, 9, 0).getTime(), // 26/04 09:00
    duration: 1
  },
  {
    id: 5,
    court: 'Quadra 2',
    courtNumber: 2,
    modality: 'Basquete',
    time: new Date(2025, 3, 26, 9, 0).getTime(), // 26/04 09:00
    duration: 1
  },
  {
    id: 6,
    court: 'Quadra 3',
    courtNumber: 3,
    modality: 'Futsal',
    time: new Date(2025, 3, 26, 9, 0).getTime(), // 26/04 09:00
    duration: 1
  },

  // Outras reservas variadas
  {
    id: 7,
    court: 'Quadra 2',
    courtNumber: 2,
    modality: 'Vôlei',
    time: new Date(2025, 3, 26, 15, 0).getTime(), // 26/04 15:00
    duration: 1
  },
  {
    id: 8,
    court: 'Quadra 1',
    courtNumber: 1,
    modality: 'Futsal',
    time: new Date(2025, 3, 29, 16, 30).getTime(), // 29/04 16:30
    duration: 0.5
  }
]

export interface Reservation {
  id: number
  court: string
  courtNumber: number
  modality: string
  time: number
  duration: number
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
  const today = new Date()
  const modalities = ['Basquete', 'Handbol', 'Futsal', 'Vôlei', 'Tênis']
  const equipments = [
    'Bola de futsal',
    'Bola de handol',
    'Bola de tênis',
    'Bola de vôlei',
    'Raquete de tênis'
  ]
  const options = ['Quadra 1', 'Quadra 2', 'Quadra 3']

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
          (timestamp < reserva.endTime && timestamp >= reserva.time) ||
          (endTime <= reserva.endTime && endTime > reserva.time)
        ) {
          sameTimeReservations.add(reserva.courtNumber)
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
          (timestamp < reserva.endTime && timestamp >= reserva.time) ||
          (endTime <= reserva.endTime && endTime > reserva.time)
        ) {
          sameTimeReservations.add(reserva.courtNumber)
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

  const reservasConvertidas = reservas.map((reserva) => {
    const date = new Date(Number(reserva.time))
    return {
      ...reserva,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      endTime: reserva.time + reserva.duration * 60 * 60 * 1000
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

    const occupiedCourts = new Set() // Como se fosse um array para armazenar as quadras ocupadas

    reservasConvertidas
      .filter((reserva) => reserva.day === day)
      .forEach((reserva) => {
        if (timestamp < reserva.endTime && timestamp >= reserva.time) {
          occupiedCourts.add(reserva.courtNumber) // Adiciona a quadra ao Set de quadras ocupadas
        }
      })

    // Se todas as 3 quadras estiverem ocupadas, bloqueia o modal
    if (occupiedCourts.size >= 3) {
      console.log(
        'Todas as quadras estão ocupadas neste horário. Não é possível fazer mais reservas.'
      )
    } else {
      handleOpenModal()
      setSelectedTime(timestamp)
      setTimeout(() => {
        setBookingModalVisible(true)
      }, 100)
    }
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
                          key={reserva.id}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            'absolute flex',
                            specialWidth(
                              Number(reserva.time),
                              Number(reserva.endTime),
                              thisWeek()[dayIndex]
                            ),
                            deslocation(
                              reserva.courtNumber,
                              Number(reserva.time),
                              Number(reserva.endTime),
                              thisWeek()[dayIndex]
                            )
                          )}
                          style={{
                            height: `${reserva.duration * 50 * 2}px`
                          }}
                        >
                          <CalendaryCard
                            court={reserva.courtNumber}
                            location={reserva.court}
                            modality={reserva.modality}
                            equipments={equipments}
                            time={reserva.time}
                            isChecked={[true, false]}
                            openModal={() => handleSelectingBooking(reserva)}
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
            modalities={modalities}
            equipments={equipments}
            options={options}
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
            equipments={equipments}
            time={selectedBooking.time}
            isChecked={[true, false]}
            onClose={() => handleDiselectingBooking()}
          />
        </div>
      )}
    </div>
  )
}
