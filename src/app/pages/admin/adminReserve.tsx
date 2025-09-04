/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { cn } from '../../utils/cn'
import { CiFilter } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import ReserveOptionsModal from '@/app/components/admin/reserveOptionsModal'
import MonthCalendarAdmin from '@/app/components/month-calendar-admin'
import { IoMdDownload } from 'react-icons/io'
import { Booking, useBookings, useBookingsQuery } from '@/app/hooks/use-booking'
import { CalendaryCard } from '@/app/components/calendary-card'
import { ModalityName } from '@/utils/enums/modality'
import { useMsal } from '@azure/msal-react'
import { FiLoader } from 'react-icons/fi'
import { ReservationDetails } from '@/app/components/reservation-details'

export interface Reservation {
  id: string
  court: string
  courtNumber: number
  modality: string
  time: number
  duration: number
  materials: string[]
  userId: string
  bookingId?: string
}

export default function AdminReserve() {
  const today = new Date()
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const { allBookings, setAllBookings } = useBookings()
  const [selectedBooking, setSelectedBooking] = useState<
    Reservation | undefined
  >(undefined)
  const [selectedBookingVisible, setSelectedBookingVisible] = useState(false)
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const [clickedTime, setClickedTime] = useState<number>(0)
  // Estado de quadra selecionada removido (não mais necessário após retirar bloqueio de modal)

  const handleDateSelect = async (date: Date) => {
    setLoading(true)
    setSelectedDate(date)
    const selected = new Date(date)
    const dayOfWeek = selected.getDay()
    const sunday = selected.getDate() - dayOfWeek
    const startOfWeek = new Date(selected)
    if (sunday < 1) {
      startOfWeek.setMonth(selected.getMonth() - 1)
      startOfWeek.setDate(sunday + 31)
      startOfWeek.setHours(0, 0, 0, 0)
    } else {
      startOfWeek.setDate(sunday)
      startOfWeek.setHours(0, 0, 0, 0)
    }
    const nextSunday = selected.getDate() + (7 - dayOfWeek)
    const endOfTheWeek = new Date(selected)
    if (nextSunday > 31) {
      endOfTheWeek.setMonth(selected.getMonth() + 1)
      endOfTheWeek.setDate(nextSunday - 31)
      endOfTheWeek.setHours(0, 0, 0, 0)
    } else {
      endOfTheWeek.setDate(nextSunday)
      endOfTheWeek.setHours(0, 0, 0, 0)
    }
    localStorage.setItem('start_date', startOfWeek.getTime().toString())
    localStorage.setItem('end_date', endOfTheWeek.getTime().toString())
    await getBookingsOfTheWeek.refetch()
    setLoading(false)
  }

  const { getBookingsOfTheWeek } = useBookingsQuery()

  // Função chamada quando o mês é alterado no calendário
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
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

  useEffect(() => {
    if (getBookingsOfTheWeek.data) {
      setAllBookings(getBookingsOfTheWeek.data.bookings)
    }
  }, [getBookingsOfTheWeek.data, setAllBookings])

  useEffect(() => {
    fetchAccessToken()
    localStorage.setItem('end_date', endOfTheWeek().toString())
    localStorage.setItem('start_date', startOfTheWeek().toString())
  }, [])

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

    // Removida a lógica de bloqueio de modal baseada em quadras ocupadas.
    // Agora sempre permitirá abrir (desde que o horário não tenha passado).
    // Caso futuramente queira impedir reserva específica, tratar dentro do modal.

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

  const reservasConvertidas = allBookings.map((reserva: Booking) => {
    const date = new Date(Number(reserva.start_date))
    return {
      ...reserva,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes()
    }
  })

  const specialWidth = (timestamp: number, endDate: number, day: number) => {
    const sameTimeReservations = new Set()

    reservasConvertidas
      .filter((reserva: { day: any }) => Number(reserva.day) === day)
      .forEach(
        (reserva: {
          end_date: number
          start_date: number
          court_number: unknown
        }) => {
          if (
            (timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
            (endDate <= reserva.end_date && endDate > reserva.start_date)
          ) {
            sameTimeReservations.add(reserva.court_number)
          }
        }
      )

    return sameTimeReservations.size > 1
      ? sameTimeReservations.size > 2
        ? 'xl:w-2/5 lg:w-1/3 md:w-1/2 w-4/5'
        : 'xl:w-[45%] lg:w-2/5 md:w-1/2 w-4/5'
      : 'xl:w-[86%] lg:w-4/5 md:w-3/4 w-4/5'
  }

  const deslocation = (
    courtNumber: number,
    timestamp: number,
    endDate: number,
    day: number
  ) => {
    const sameTimeReservations = new Set()

    reservasConvertidas
      .filter((reserva: { day: any }) => Number(reserva.day) === day)
      .forEach(
        (reserva: {
          end_date: number
          start_date: number
          court_number: unknown
        }) => {
          if (
            (timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
            (endDate <= reserva.end_date && endDate > reserva.start_date)
          ) {
            sameTimeReservations.add(reserva.court_number)
          }
        }
      )

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

    // switch (courtNumber) {
    //   case 1:
    //     return 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   case 2:
    //     return sameTimeReservations.size > 1
    //       ? sameTimeReservations.size === 2
    //         ? isItOne
    //           ? 'lg:left-[46%] md:left-[42%] left-[33%]'
    //           : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //         : 'lg:left-[30%] md:left-[25%] left-[18%]'
    //       : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   case 3:
    //     return sameTimeReservations.size > 1
    //       // ? sameTimeReservations.size === 2
    //       //   ? isItOne
    //           ? 'lg:left-[46%] md:left-[42%] left-[33%]'
    //           : 'lg:left-[56%] md:left-[52%] left-[66%]'
    //         : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //       : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   // case 4:
    //   //   return sameTimeReservations.size > 1
    //   //     ? sameTimeReservations.size === 2
    //   //       ? isItOne
    //   //         ? 'lg:left-[46%] md:left-[42%] left-[33%]'
    //   //         : 'lg:left-[56%] md:left-[52%] left-[66%]'
    //   //       : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   //     : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   // case 5:
    //   //   return sameTimeReservations.size > 1
    //   //     ? sameTimeReservations.size === 2
    //   //       ? isItOne
    //   //         ? 'lg:left-[46%] md:left-[42%] left-[33%]'
    //   //         : 'lg:left-[56%] md:left-[52%] left-[66%]'
    //   //       : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   //     : 'lg:left-[4%] md:left-[2%] left-[1%]'
    //   default:
    //     return ''
    // }
  }

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  function handleDiselectingBooking() {
    setSelectedBookingVisible(false)
    setTimeout(() => {
      setSelectedBooking(undefined)
    }, 200)
  }

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
        <div className="relative z-[90] flex w-full flex-col font-poppins text-base font-semibold text-gray-600 md:flex-row">
          {loading && (
            <div className="fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-sm">
              <FiLoader className="animate-spin" color="black" size={64} />
            </div>
          )}
          {/* Floating menu in the bottom-left corner */}
          <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
            <div className="flex flex-col gap-2 text-black">
              <CiFilter
                size={32}
                className="duration-300 hover:scale-110 hover:cursor-pointer"
              />
            </div>
            <div className="flex gap-2 text-sm">
              {/* <button
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
              </button> */}
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
              {/* {selectedDate.toLocaleDateString('pt-Br', {
                month: 'long',
                year: 'numeric'
              })} */}
              Mês
            </h1>
            {/* Month calendar */}
            <MonthCalendarAdmin
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
            <div className="-mt-2 flex cursor-pointer flex-row items-center justify-center gap-2 text-start font-poppins">
              <IoMdDownload />
              <span>RELATÓRIO</span>
            </div>
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
                              reserva.minute === (minute == 1 ? 30 : 0) &&
                              reserva.day === thisWeek()[dayIndex]
                            ) {
                              return (
                                <div
                                  key={reserva.booking_id}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBooking({
                                      id: reserva.booking_id || '',
                                      court: `Quadra ${reserva.court_number}`,
                                      courtNumber: reserva.court_number,
                                      modality: reserva.sport,
                                      time: reserva.start_date,
                                      duration:
                                        (reserva.end_date -
                                          reserva.start_date) /
                                        (1000 * 60), // duração em minutos
                                      materials: reserva.materials || [],
                                      userId: reserva.user_id || ''
                                    })
                                    setSelectedBookingVisible(true)
                                  }}
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
                                    time={reserva.start_date}
                                    isChecked={[true, false]}
                                    equipments={[]}
                                    openModal={function (): void {
                                      throw new Error(
                                        'Function not implemented.'
                                      )
                                    }}
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
          </div>
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
                bookingId={selectedBooking.id}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
