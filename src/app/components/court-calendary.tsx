import { Button } from './button'
import { CalendaryCard } from './calendary-card'
import { useState } from 'react'
import { Form } from './form'
import { View } from './view'

const reservas = [
  {
    id: 1,
    court: 'Quadra 1',
    courtNumber: 1,
    modality: 'Basquete',
    time: 1738252800000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 2,
    court: 'Quadra2',
    courtNumber: 2,
    modality: 'Vôlei',
    time: 1738407600000 + 7 * 24 * 60 * 60 * 1000 * 3
  },

  {
    id: 7,
    court: 'Quadra2',
    courtNumber: 2,
    modality: 'Vôlei',
    time: 1738069200000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 4,
    court: 'Quadra2',
    courtNumber: 2,
    modality: 'vôlei',
    time: 1738252800000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 5,
    court: 'Quadra3',
    courtNumber: 3,
    modality: 'futsal',
    time: 1738252800000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 6,
    court: 'Quadra3',
    courtNumber: 3,
    modality: 'Vôlei',
    time: 1738407600000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 8,
    court: 'Quadra1',
    courtNumber: 1,
    modality: 'Futsal',
    time: 1738238400000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 9,
    court: 'Quadra3',
    courtNumber: 3,
    modality: 'Vôlei',
    time: 1738238400000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 9,
    court: 'Quadra1',
    courtNumber: 1,
    modality: 'Vôlei',
    time: 1738159200000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 10,
    court: 'Quadra2',
    courtNumber: 2,
    modality: 'Basquete',
    time: 1738159200000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 11,
    court: 'Quadra1',
    courtNumber: 1,
    modality: 'Basquete',
    time: 1737997200000 + 7 * 24 * 60 * 60 * 1000 * 3
  },
  {
    id: 12,
    court: 'Quadra3',
    courtNumber: 3,
    modality: 'Basquete',
    time: 1738245600000 + 7 * 24 * 60 * 60 * 1000 * 3
  }
]

export function Court() {
  const [isMyBookingsModalOpen, setIsMyBookingsModalOpen] = useState(false)
  const [isMyBookingsModalVisible, setIsMyBookingsModalVisible] =
    useState(false)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [bookingModalVisible, setBookingModalVisible] = useState(false)
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

  const thisMonth = () => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]
    return months[today.getMonth()]
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

  const specialWidth = (courtNumber: number, timestamp: number) => {
    const sameTimeReservations = reservas.filter(
      (reserva) => Number(reserva.time) === timestamp
    )

    const countSameTime = sameTimeReservations.length

    switch (courtNumber) {
      case 1:
        return countSameTime > 1
          ? countSameTime > 2
            ? 'min-[1777px]:w-1/3'
            : 'min-[1777px]:w-[45%]'
          : 'min-[1777px]:w-[90%]'
      case 2:
        return countSameTime > 1
          ? countSameTime > 2
            ? 'min-[1777px]:w-1/3'
            : 'min-[1777px]:w-[45%]'
          : 'min-[1777px]:w-[90%]'
      case 3:
        return countSameTime > 1
          ? countSameTime > 2
            ? 'min-[1777px]:w-1/3'
            : 'min-[1777px]:w-[45%]'
          : 'min-[1777px]:w-[90%]'
    }
  }

  function handleOpeMyBookings() {
    setIsMyBookingsModalOpen(true)
    setTimeout(() => {
      setIsMyBookingsModalVisible(true)
    }, 100)
  }

  const deslocation = (courtNumber: number, timestamp: number) => {
    const sameTimeReservations = reservas.filter(
      (reserva) => Number(reserva.time) === timestamp
    )

    const isItOne = sameTimeReservations.some(
      (reserva) => reserva.courtNumber === 1
    )

    const countSameTime = sameTimeReservations.length

    switch (courtNumber) {
      case 1:
        return 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[4%]'
      case 2:
        return countSameTime > 1
          ? isItOne
            ? 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[30%]'
            : 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[4%]'
          : 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[4%]'
      case 3:
        return countSameTime > 1
          ? countSameTime > 2
            ? 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[56%]'
            : 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[30%]'
          : 'max-[1776px]:absolute max-[1776px]:w-20 max-[1776px]:h-20 max-[1776px]:left-[4%]'
      default:
        return 4
    }
  }

  const reservasConvertidas = reservas.map((reserva) => {
    const date = new Date(Number(reserva.time))
    return {
      ...reserva,
      day: date.getDate(),
      hour: date.getHours()
    }
  })

  const handleClickedTime = (hour: number, dayIndex: number) => {
    const clickedTime = new Date()
    clickedTime.setDate(
      clickedTime.getDate() - clickedTime.getDay() + dayIndex + 1
    )
    clickedTime.setHours(hour)
    clickedTime.setMinutes(0)
    clickedTime.setSeconds(0)
    clickedTime.setMilliseconds(0)
    console.log(clickedTime)
    console.log(clickedTime.getTime())

    if (
      reservasConvertidas.filter(
        (reserva) => reserva.time === clickedTime.getTime()
      ).length >= 3
    ) {
      console.log('Não eh possível fazer mais reservas nesse horário')
    } else {
      console.log('Nenhuma reserva encontrada, abrindo modal...')
      handleToggleReservationModal()
      setSelectedTime(clickedTime.getTime())
      setTimeout(() => {
        setBookingModalVisible(true)
      }, 100)
    }
  }

  function handleToggleReservationModal() {
    setIsReservationModalOpen(!isReservationModalOpen)
    setBookingModalVisible(false)
  }

  return (
    <div className="w-full">
      <div className="relative h-44 w-full bg-quadra bg-cover bg-center">
        <div className="h-full w-full bg-black/50">
          <div className="absolute bottom-0 left-0 p-5 font-poppins text-white">
            <p className="text-3xl font-semibold">Quadras</p>
            <p className="text-2xl font-normal">
              {thisMonth()}, {thisWeek()[0]}-{thisWeek()[5]}
            </p>
          </div>
          <div className="absolute bottom-0 right-0 p-8">
            <Button onClick={handleOpeMyBookings} className="h-12 w-52 p-1">
              Minhas Reservas
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex font-poppins text-base font-semibold text-gray-600">
          <div className="w-24 bg-blue-primary p-4 text-xl text-white">
            Hora
          </div>
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
        <div className="h-12 border-gray-400"></div>
        {[...Array(14)].map((_, index) => {
          const hour = 8 + index
          return (
            <div key={index} className="flex">
              <div className="flex min-h-28 min-w-20 max-w-20 items-start border-r border-gray-400 px-4 font-poppins">{`${hour}:00`}</div>
              <div className="flex flex-1">
                {[...Array(6)].map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    onClick={handleClickedTime.bind(null, hour, dayIndex)}
                    className={`relative flex flex-1 gap-2 border-b border-r border-gray-400 bg-gray-200 p-2 last:border-r-0 hover:cursor-pointer hover:bg-gray-300`}
                  >
                    {reservasConvertidas.map((reserva) => {
                      if (
                        reserva.hour === hour &&
                        reserva.day === thisWeek()[dayIndex]
                      ) {
                        return (
                          <div
                            key={reserva.id}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex ${specialWidth(reserva.courtNumber, Number(reserva.time))} ${deslocation(reserva.courtNumber, Number(reserva.time))}`}
                          >
                            <CalendaryCard
                              court={reserva.courtNumber}
                              location={reserva.court}
                              modality={reserva.modality}
                              equipments={equipments}
                              time="12:00"
                              isChecked={[true, false]}
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
      </div>
      {isReservationModalOpen && selectedTime && (
        <div
          className={`duration-250 fixed inset-0 flex items-center justify-center bg-black/50 transition-all ${bookingModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
        >
          <Form
            isOpen={isReservationModalOpen}
            onClose={handleToggleReservationModal}
            timestamp={selectedTime}
            modalities={modalities}
            equipments={equipments}
            options={options}
          />
        </div>
      )}
      {isMyBookingsModalOpen && (
        <div
          className={`duration-250 fixed inset-0 flex items-center justify-center bg-black/50 transition-all ${isMyBookingsModalVisible ? 'translate-y-0 opacity-100' : 'translate-y-96 opacity-0'} backdrop-blur-sm`}
        >
          <View
            onClose={() => {
              setIsMyBookingsModalOpen(false)
              setIsMyBookingsModalVisible(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
