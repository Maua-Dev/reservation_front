import { cn } from '../../utils/cn'

const reservas = [
  {
    id: 1,
    court: 'Quadra 1',
    courtNumber: 1,
    modality: 'Basquete',
    time: 1738252800000 + 7 * 24 * 60 * 60 * 1000 * 7,
    duration: 1
  },
  {
    id: 2,
    court: 'Quadra 2',
    courtNumber: 2,
    modality: 'Vôlei',
    time: 1738407600000 + 7 * 24 * 60 * 60 * 1000 * 4 + 30 * 60 * 1000,
    duration: 0.5
  },
  {
    id: 7,
    court: 'Quadra 2',
    courtNumber: 2,
    modality: 'Vôlei',
    time: 1738069200000 + 7 * 24 * 60 * 60 * 1000 * 4,
    duration: 1
  }
]

export default function AdminReserve() {
  const today = new Date()
  const month = today.toLocaleString('default', { month: 'long' })

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
    }
  }

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

  const thisWeek = () => {
    const week = []
    for (let i = 1; i <= 6; i++) {
      const day = new Date(today)
      day.setDate(today.getDate() - today.getDay() + i)
      week.push(day.getDate())
    }
    return week
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
          ? sameTimeReservations.size === 2
            ? isItOne
              ? 'absolute w-20 h-20 left-[46%]'
              : 'absolute w-20 h-20 left-[4%]'
            : 'absolute w-20 h-20 left-[30%]'
          : 'absolute w-20 h-20 left-[4%]'
      case 3:
        return sameTimeReservations.size > 1
          ? sameTimeReservations.size === 2
            ? 'absolute w-20 h-20 left-[46%]'
            : 'absolute w-20 h-20 left-[56%]'
          : 'absolute w-20 h-20 left-[4%]'
      default:
        return ''
    }
  }

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <main className="z-50 flex h-auto w-full flex-col items-center justify-center overflow-x-hidden bg-white pt-24">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="sticky top-[5.4rem] z-[90] flex w-full font-poppins text-base font-semibold text-gray-600">
          {/* Coluna do mês - 25% */}
          <div className="flex h-auto w-1/4 flex-grow-0 flex-col bg-white">
            <h1 className="flex h-20 w-full items-center justify-center bg-blue-primary p-4 text-xl text-white">
              {month}
            </h1>
            {/* Month calendar */}
            <div className="flex h-auto w-full flex-col items-center justify-center bg-white p-4">
              <div className="grid grid-cols-7 gap-2 text-center">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                  <div
                    key={index}
                    className="flex h-10 items-center justify-center font-bold text-gray-600"
                  >
                    {day}
                  </div>
                ))}
                {Array.from({ length: 42 }, (_, index) => {
                  const firstDayOfMonth = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                  )
                  const day = index - firstDayOfMonth.getDay() + 1
                  const date = new Date(today)
                  date.setDate(day)

                  const isToday =
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth()

                  const isCurrentMonth = date.getMonth() === today.getMonth()

                  return (
                    <div
                      key={index}
                      className={`flex h-10 w-6 items-center justify-center rounded-md ${
                        isToday
                          ? 'bg-blue-primary text-white'
                          : isCurrentMonth
                            ? 'text-gray-600 hover:cursor-pointer hover:bg-blue-100'
                            : 'text-gray-400'
                      }`}
                    >
                      {isCurrentMonth ? date.getDate() : ''}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Coluna da semana - 75% */}
          <div className="flex h-auto w-3/4 flex-col">
            <div className="flex h-20 w-full flex-col items-center bg-blue-primary p-4 text-xl text-white">
              <div className="flex w-full">
                <div className="w-32 bg-blue-primary p-4 text-xl text-white">
                  Semana
                </div>
                <div className="flex flex-1 text-center text-lg text-white">
                  {thisWeek().map((date, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-xl font-normal"
                    >
                      <div>{date}</div>
                      <div>{weekDays[index]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              {[...Array(25)].map((_, index) => {
                const hour = 8 + Math.floor(index / 2)
                const minute = index % 2
                const isHourSeparator = minute === 0
                return (
                  <div key={index} className="flex">
                    <div className="flex h-16 w-32 items-center justify-center border-b border-r border-gray-400 bg-white px-4 font-poppins text-black">
                      {`${hour}:${minute === 0 ? '00' : '30'}`}
                    </div>
                    <div className="flex flex-1">
                      {[...Array(6)].map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          onClick={() =>
                            handleClickedTime(
                              hour,
                              minute,
                              thisWeek()[dayIndex],
                              dayIndex + 1
                            )
                          }
                          className={`relative flex min-w-[120px] max-w-xl flex-1 gap-2 border-b border-r border-gray-400 ${
                            isPassed(
                              thisWeek()[dayIndex],
                              dayIndex + 1,
                              hour,
                              minute
                            )
                              ? 'bg-gray-300'
                              : 'bg-gray-200 hover:cursor-pointer hover:bg-blue-100'
                          } p-2 last:border-r-0`}
                          style={{
                            borderBottomStyle: isHourSeparator
                              ? 'dashed'
                              : 'solid',
                            borderRightStyle: 'solid',
                            height: '64px'
                          }}
                        >
                          {reservasConvertidas.map((reserva) => {
                            if (
                              reserva.hour === hour &&
                              reserva.minute === (minute === 1 ? 30 : 0) &&
                              reserva.day === thisWeek()[dayIndex]
                            ) {
                              return (
                                <div
                                  key={reserva.id}
                                  onClick={(e) => e.stopPropagation()}
                                  className={cn(
                                    'absolute flex items-center justify-center rounded-md bg-blue-200 p-2 text-blue-800',
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
                                    height: `${reserva.duration * 64}px`
                                  }}
                                >
                                  <div className="text-sm font-medium">
                                    {reserva.court} - {reserva.modality}
                                  </div>
                                </div>
                              )
                            }
                            return null
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
