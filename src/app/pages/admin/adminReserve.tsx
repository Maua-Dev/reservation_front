
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { cn } from '../../utils/cn'
// import { CiFilter } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import ReserveOptionsModal from '@/app/components/admin/reserveOptionsModal'
//import MonthCalendarAdmin from '@/app/components/month-calendar-admin'
//import { IoMdDownload } from 'react-icons/io'
import { Booking, useBookings, useBookingsQuery } from '@/app/hooks/use-booking'
import { CalendaryCard } from '@/app/components/calendary-card'
import { ModalityName } from '@/utils/enums/modality'
import { useMsal } from '@azure/msal-react'
import { FiLoader } from 'react-icons/fi'
import { ReservationDetails } from '@/app/components/reservation-details'
//import { LuDownload } from 'react-icons/lu'
import { LuCalendar } from 'react-icons/lu'
//import SelectDateModal from '@/app/components/select-date-modal'
import SelectDateModalAdmin from '@/app/components/calendar-admin'
//import { Button } from '@/app/components/button'

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
  // const [currentMonth, setCurrentMonth] = useState<number>(
  //   new Date().getMonth()
  // )
  const { allBookings, setAllBookings } = useBookings()
  const [selectedBooking, setSelectedBooking] = useState<
    Reservation | undefined
  >(undefined)
  const [selectedBookingVisible, setSelectedBookingVisible] = useState(false)
  // const [currentYear, setCurrentYear] = useState<number>(
  //   new Date().getFullYear()
  // )
  const [clickedTime, setClickedTime] = useState<number>(0)
  // Estado de quadra selecionada removido (não mais necessário após retirar bloqueio de modal)

  // Constante para reniderização do Mini CAlendário
  const [showCalendar, setShowCalendar] = useState(false)

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

  // // Função chamada quando o mês é alterado no calendário
  // const handleMonthChange = (month: number, year: number) => {
  //   setCurrentMonth(month)
  //   setCurrentYear(year)
  // }

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
      minute: date.getMinutes(),
      courtNumber: Number((reserva as any).court_number)
    }
  })

  // const specialWidth = (timestamp: number, endDate: number, day: number) => {
  //   const sameTimeReservations = new Set<number>()

  //   reservasConvertidas
  //     .filter((reserva: { day: any }) => Number(reserva.day) === day)
  //     .forEach(
  //       (reserva: {
  //         end_date: number
  //         start_date: number
  //         court_number: unknown | number
  //       }) => {
  //         if (
  //           (timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
  //           (endDate <= reserva.end_date && endDate > reserva.start_date)
  //         ) {
  //           sameTimeReservations.add(Number(reserva.court_number))
  //         }
  //       }
  //     )

  //   return sameTimeReservations.size > 1
  //     ? sameTimeReservations.size > 2
  //       ? 'xl:w-2/5 lg:w-1/3 md:w-1/2 w-4/5'
  //       : 'xl:w-[45%] lg:w-2/5 md:w-1/2 w-4/5'
  //     : 'xl:w-[86%] lg:w-4/5 md:w-3/4 w-4/5'
  // }

  function getReservationOffset(
    courtNumber: number,
    timestamp: number,
    endDate: number,
    day: number,
    allReservations: any[]
  ) {
    const sameTimeReservations = allReservations.filter((reserva) => {
      return (
        reserva.day === day &&
        ((timestamp < reserva.end_date && timestamp >= reserva.start_date) ||
          (endDate <= reserva.end_date && endDate > reserva.start_date))
      )
    })

    if (sameTimeReservations.length <= 1) {
      return {
        className: 'absolute transition-all',
        style: { left: '0%', width: '100px', zIndex: 40 }
      }
    }

    const sorted = sameTimeReservations.sort(
      (a, b) => Number(a.court_number) - Number(b.court_number)
    )

    const index = sorted.findIndex(
      (r) => Number(r.court_number) === courtNumber
    )

    const total = sameTimeReservations.length
    const gapPercent = -20

    const widthPercent = (85 - gapPercent * (total - 1)) / total
    const leftPercent = index * (widthPercent + gapPercent)

    return {
      className: 'absolute transition-all',
      style: {
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        zIndex: 10 + index * 2
      }
    }
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
        <div className="relative z-[80] flex w-full flex-col font-poppins text-base font-semibold text-gray-600">
          {loading && (
            <div
              className="fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-sm"
              style={{ pointerEvents: 'none' }}
            >
              <FiLoader className="animate-spin" color="black" size={64} />
            </div>
          )}

          <div className="flex-col">
            <div className="w-full justify-items-center">
              <div className="flex w-full items-end justify-end">
                <img
                  className="h-[150px] w-full"
                  src="src/app/assets/maua3.1.png"
                  alt=""
                />{' '}
                {/* <div className="h-2rem w-full"> */}
                <SelectDateModalAdmin
                  isOpen={showCalendar}
                  onClose={() => setShowCalendar(false)}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
                <button
                  id="calendar_btn"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="absolute mb-[10px] mr-5 flex h-[50px] w-[160px] items-center justify-center justify-items-center gap-3 rounded-lg bg-blue-primary p-3 text-white"
                >
                  <LuCalendar className="h-[30px] w-[30px]" />
                  Calendário
                </button>
                {/* </div> */}
              </div>
            </div>

            {/* Coluna da semana - 75% em telas grandes, 100% em telas pequenas */}
            <div className="flex h-full w-full flex-col bg-white">
              <div className="sticky top-0 z-30 flex h-20 w-full flex-col items-center bg-blue-primary p-4 text-xl text-white">
                <div className="flex w-full">
                  <div className="sticky top-0 min-w-28 bg-blue-primary p-4 text-sm text-white md:text-base">
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

              <div className="flex flex-col overflow-x-auto">
                {[...Array(28)].map((_, index) => {
                  const hour = 8 + Math.floor(index / 2)
                  const minute = index % 2
                  const isHourSeparator = minute === 0
                  return (
                    <div key={index} className="flex min-w-full bg-white">
                      <div className="h-34 flex min-w-24 items-center justify-center border-b border-r border-gray-400 bg-white px-2 font-poppins text-black md:min-w-32 md:px-4">
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
                            className={`relative flex min-w-14 flex-1 gap-2 border-b border-r border-gray-400 pl-1 lg:min-w-24 ${
                              isPassed(selectedWeek()[dayIndex], hour, minute)
                                ? 'bg-gray-300'
                                : 'bg-gray-200 hover:cursor-pointer hover:bg-blue-100'
                            } p-2 last:border-r-0`}
                            style={{
                              borderBottomStyle: isHourSeparator
                                ? 'dashed'
                                : 'solid',
                              borderRightStyle: 'solid',
                              height: '130px'
                            }}
                          >
                            {reservasConvertidas.map((reserva) => {
                              if (
                                reserva.hour === hour &&
                                reserva.minute === (minute == 1 ? 30 : 0) &&
                                reserva.day === thisWeek()[dayIndex]
                              ) {
                                const offset = getReservationOffset(
                                  Number(reserva.court_number),
                                  Number(reserva.start_date),
                                  Number(reserva.end_date),
                                  Number(reserva.day),
                                  reservasConvertidas
                                )

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
                                    className={cn('flex', offset.className)}
                                    style={{
                                      ...offset.style,
                                      height: `${Math.max(
                                        130,
                                        ((reserva.end_date -
                                          reserva.start_date) /
                                          (1000 * 60 * 30)) *
                                          130
                                      )}px`,
                                      paddingBottom: '10px'
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
      </div>
    </main>
  )
}
