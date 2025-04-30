/* eslint-disable prettier/prettier */
import { cn } from '../../utils/cn'
import { CiFilter } from 'react-icons/ci'
import { useState } from 'react'
import ReserveOptionsModal from '@/app/components/admin/reserveOptionsModal'
import MonthCalendarAdmin from '@/app/components/month-calendar-admin'
import { set } from 'react-hook-form'

const reservas = [
  {
    id: 1,
    court: 'Quadra 1',
    courtNumber: 1,
    modality: 'Basquete',
    time: new Date(2025, 4, 1, 17, 30).getTime(), //year, month, day, hour, minute
    duration: 1
  }
]

export default function AdminReserve() {
  const today = new Date()
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const [clickedTime, setClickedTime] = useState<number>(0)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  // Função chamada quando o mês é alterado no calendário
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  // A FUNÇÃO TA ERRADA EU ACHO CORRIGIR DPS
  function handleClickedTime(hour: number, minute: number, day: number) {
    // Cria a data selecionada
    const date = new Date(selectedDate)
    if (
      day > selectedDate.getDate() &&
      day > 15 &&
      selectedDate.getDate() < 15
    ) {
      date.setMonth(date.getMonth() - 1)
    } else if (
      day < selectedDate.getDate() &&
      day < 12 &&
      selectedDate.getDate() > 15
    ) {
      date.setDate(28)
      date.setMonth(date.getMonth() + 1)
    }

    date.setDate(day)
    date.setHours(hour)
    date.setMinutes(minute === 0 ? 0 : 30)
    date.setSeconds(0)
    date.setMilliseconds(0)

    // transforma para timestamp
    const timestamp = date.getTime() // Timestamp da data selecionada

    // Retorna se a data já passou
    if (isPassed(day, hour, minute)) {
      console.log('Data já passou')
      return
    }

    // Verifica se a quadra está ocupada
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

    setClickedTime(timestamp)
    setIsOptionsOpen(true)
  }

  const selectedWeek = () => {
    const week = []
    for (let i = 1; i < 7; i++) {
      const day = new Date(selectedDate)
      day.setDate(selectedDate.getDate() - selectedDate.getDay() + i)
      week.push(day.getDate())
    }
    return week
  }

  const isPassed = (day: number, hour: number, minute: number) => {
    const date = new Date(selectedDate) // Use a data selecionada como base
    // Ajustar o mês e o ano se o dia pertencer ao próximo ou ao mês anterior
    if (
      day > selectedDate.getDate() &&
      day > 15 &&
      selectedDate.getDate() < 15
    ) {
      date.setMonth(date.getMonth() - 1)
    } else if (
      day < selectedDate.getDate() &&
      day < 12 &&
      selectedDate.getDate() > 15
    ) {
      date.setDate(28)
      date.setMonth(date.getMonth() + 1)
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
    for (let i = 1; i < 7; i++) {
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
      minute: date.getMinutes() == 30 ? 1 : 0,
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
        ? 'xl:w-2/5 lg:w-1/3 md:w-1/2 w-4/5'
        : 'xl:w-[45%] lg:w-2/5 md:w-1/2 w-4/5'
      : 'xl:w-[86%] lg:w-4/5 md:w-3/4 w-4/5'
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
        return 'lg:left-[4%] md:left-[2%] left-[1%]'
      case 2:
        return sameTimeReservations.size > 1
          ? sameTimeReservations.size === 2
            ? isItOne
              ? 'lg:left-[46%] md:left-[42%] left-[33%]'
              : 'lg:left-[4%] md:left-[2%] left-[1%]'
            : 'lg:left-[30%] md:left-[25%] left-[18%]'
          : 'lg:left-[4%] md:left-[2%] left-[1%]'
      case 3:
        return sameTimeReservations.size > 1
          ? sameTimeReservations.size === 2
            ? 'lg:left-[46%] md:left-[42%] left-[33%]'
            : 'lg:left-[56%] md:left-[52%] left-[66%]'
          : 'lg:left-[4%] md:left-[2%] left-[1%]'
      default:
        return ''
    }
  }

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <main className="z-50 flex h-auto w-full flex-col items-center justify-center bg-white pt-24">
      <ReserveOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => {
          setIsOptionsOpen(false)
          setClickedTime(0)
        }}
        timestamp={clickedTime}
      />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="top-[5.4rem] z-[90] flex w-full flex-col font-poppins text-base font-semibold text-gray-600 md:flex-row">
          {/* Floating menu in the bottom-left corner */}
          <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
            <div className="flex flex-col gap-2 text-black">
              <CiFilter
                size={32}
                className="duration-300 hover:scale-110 hover:cursor-pointer"
              />
            </div>
            <div className="flex gap-2 text-sm">
              <button
                className="rounded-lg bg-grey-primary p-2 text-white shadow-lg duration-300 hover:bg-grey-primary/70"
                onClick={() => console.log('Reserva clicked')}
              >
                Reserva
              </button>
              <button
                className="rounded-lg bg-yellow p-2 text-white shadow-lg duration-300 hover:bg-yellow/70"
                onClick={() => console.log('Manutenção clicked')}
              >
                Manutenção
              </button>
              <button
                className="rounded-lg bg-grey-primary p-2 text-white shadow-lg duration-300 hover:bg-grey-primary/70"
                onClick={() => console.log('Campo clicked')}
              >
                Campo
              </button>
              <button
                className="rounded-lg bg-yellow p-2 text-white shadow-lg duration-300 hover:bg-yellow/70"
                onClick={() => console.log('Quadras clicked')}
              >
                Quadras
              </button>
            </div>
          </div>
          {/* Coluna do mês - 25% em telas grandes, 100% em telas pequenas */}
          <div className="sticky top-0 flex h-full min-h-screen w-full flex-grow flex-col bg-white md:w-1/4">
            <h1 className="sticky top-0 flex h-20 w-full items-center justify-center bg-blue-primary p-4 text-xl text-white">
              {selectedDate.toLocaleDateString('pt-Br', {
                month: 'long',
                year: 'numeric'
              })}
            </h1>
            {/* Month calendar */}
            <MonthCalendarAdmin
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
          </div>

          {/* Coluna da semana - 75% em telas grandes, 100% em telas pequenas */}
          <div className="flex h-full w-full flex-col bg-white md:w-3/4">
            <div className="sticky top-0 z-30 flex h-20 w-full flex-col items-center bg-blue-primary p-4 text-xl text-white">
              <div className="flex w-full">
                <div className="sticky top-0 ml-4 min-w-28 bg-blue-primary p-4 text-sm text-white md:text-base">
                  Semana
                </div>
                <div className="flex flex-1 overflow-x-auto text-center text-lg text-white">
                  {selectedWeek().map((date, index) => (
                    <div
                      key={index}
                      className="flex min-w-10 flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-lg font-normal md:min-w-12 md:text-xl"
                    >
                      <div>{date}</div>
                      <div>{weekDays[index]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-x-auto pl-6 pr-4">
              {[...Array(28)].map((_, index) => {
                const hour = 8 + Math.floor(index / 2)
                const minute = index % 2
                const isHourSeparator = minute === 0
                return (
                  <div key={index} className="flex min-w-full bg-white">
                    <div className="flex h-16 min-w-24 items-center justify-center border-b border-r border-gray-400 bg-white px-2 font-poppins text-black md:min-w-32 md:px-4">
                      {`${hour}:${minute === 0 ? '00' : '30'}`}
                    </div>
                    <div className="flex min-w-max flex-1">
                      {[...Array(6)].map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          onClick={() =>
                            handleClickedTime(
                              hour,
                              minute,
                              selectedWeek()[dayIndex]
                            )
                          }
                          className={`relative flex min-w-14 flex-1 gap-2 border-b border-r border-gray-400 lg:min-w-24 ${
                            isPassed(selectedWeek()[dayIndex], hour, minute)
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
                              reserva.minute === minute &&
                              reserva.day === selectedWeek()[dayIndex]
                            ) {
                              return (
                                <div
                                  key={reserva.id}
                                  onClick={(e) => e.stopPropagation()}
                                  className={cn(
                                    'absolute flex items-center justify-center rounded-md bg-blue-200 p-1 text-xs text-blue-800 md:p-2 md:text-sm',
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
                                  <div className="truncate text-xs font-medium md:text-sm">
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
