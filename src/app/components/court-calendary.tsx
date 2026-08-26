/* eslint-disable camelcase */
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
  bookingId: string
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

// Altura de cada slot de meia hora. É a mesma altura usada nas linhas da grade
// e no cálculo da altura do card, senão o card não termina no horário certo.
const SLOT_HEIGHT = 64
// Respiro pra não colar o card na linha de cima/de baixo.
const CARD_INSET = 2

// A quadra 4 é a quadra inteira: ocupa fisicamente as quadras 1, 2 e 3. Reserva
// na 4 bloqueia as três, e reserva em qualquer uma das três bloqueia a 4.
const FULL_COURT = 4
const SUB_COURTS = [1, 2, 3]

const sharesSpaceWith = (court: number, otherCourt: number) => {
  if (court === otherCourt) return true
  if (court === FULL_COURT) return SUB_COURTS.includes(otherCourt)
  if (otherCourt === FULL_COURT) return SUB_COURTS.includes(court)
  return false
}

const BOOKING_DURATION = 60 * 60 * 1000

const slotTimestamp = (dayDate: Date, hour: number, minute: number) => {
  const date = new Date(dayDate)
  date.setHours(hour)
  date.setMinutes(minute === 0 ? 0 : 30)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
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

  const reservas = getBookingsOfTheWeek?.data?.bookings || []

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

  const handleCloseMyBookings = () => {
    setIsMyBookingsModalVisible(false)
    setTimeout(() => {
      setIsMyBookingsModalOpen(false)
    }, 200)
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

  const COURT_ORDER = [1, 2, 3, 4, 0, 5, 6]

  const courtRank = (court: number) => {
    const i = COURT_ORDER.indexOf(court)
    return i === -1 ? COURT_ORDER.length + court : i
  }

  const bookingLayout = (() => {
    const layout = new Map<object, { lane: number; total: number }>()

    // agrupa por dia
    const byDay = new Map<string, typeof reservasConvertidas>()
    for (const reserva of reservasConvertidas) {
      const list = byDay.get(reserva.dayKey) ?? []
      list.push(reserva)
      byDay.set(reserva.dayKey, list)
    }

    for (const dayReservations of byDay.values()) {
      const sorted = [...dayReservations].sort(
        (a, b) =>
          Number(a.start_date) - Number(b.start_date) ||
          courtRank(Number(a.court_number)) - courtRank(Number(b.court_number))
      )

      // Um "cluster" é um bloco contíguo de reservas que se tocam no tempo.
      // Todas as reservas do cluster compartilham o mesmo `total`, então as
      // larguras batem entre elas (antes cada card calculava o seu e brigavam).
      let cluster: typeof sorted = []
      let clusterEnd = -Infinity

      const flush = () => {
        if (cluster.length === 0) return

        // Uma coluna por quadra, na ordem de COURT_ORDER.
        const courts = [
          ...new Set(cluster.map((r) => Number(r.court_number)))
        ].sort((a, b) => courtRank(a) - courtRank(b))

        const laneOf = new Map<object, number>()
        let nextLane = 0

        for (const court of courts) {
          const ofCourt = cluster
            .filter((r) => Number(r.court_number) === court)
            .sort((a, b) => Number(a.start_date) - Number(b.start_date))

          // Sub-colunas só aparecem se a MESMA quadra tiver reservas
          // simultâneas (ex.: Atividades Livres).
          const subEnds: number[] = []
          for (const r of ofCourt) {
            const start = Number(r.start_date)
            let sub = subEnds.findIndex((end) => end <= start)
            if (sub === -1) {
              sub = subEnds.length
              subEnds.push(Number(r.end_date))
            } else {
              subEnds[sub] = Number(r.end_date)
            }
            laneOf.set(r, nextLane + sub)
          }

          nextLane += Math.max(1, subEnds.length)
        }

        const total = Math.max(1, nextLane)
        for (const [reserva, lane] of laneOf) {
          layout.set(reserva, { lane, total })
        }

        cluster = []
        clusterEnd = -Infinity
      }

      for (const r of sorted) {
        if (cluster.length > 0 && Number(r.start_date) >= clusterEnd) flush()
        cluster.push(r)
        clusterEnd = Math.max(clusterEnd, Number(r.end_date))
      }
      flush()
    }

    return layout
  })()

  function getReservationOffset(reserva: object) {
    const { lane, total } = bookingLayout.get(reserva) ?? { lane: 0, total: 1 }

    // Faixa livre nas laterais, para ainda dar pra clicar na célula e reservar.
    const GUTTER_LEFT = 4 // px
    const GUTTER_RIGHT = 16 // px
    // 1 = colunas encostadas; 1.6 = cada card 60% mais largo que a sua coluna.
    const OVERLAP = 1.6

    const width = Math.min(100, (100 / total) * OVERLAP)
    const stride = total > 1 ? (100 - width) / (total - 1) : 0
    const left = lane * stride

    const usable = `(100% - ${GUTTER_LEFT + GUTTER_RIGHT}px)`

    return {
      className: 'absolute transition-all hover:!z-[15]',
      style: {
        left: `calc(${GUTTER_LEFT}px + ${usable} * ${left / 100})`,
        width: `calc(${usable} * ${width / 100})`,
        zIndex: 10 + lane
      }
    }
  }

  const isPassed = (dayDate: Date, hour: number, minute: number) => {
    return slotTimestamp(dayDate, hour, minute) < today.getTime()
  }

  // Reservas que ocupam o espaço da quadra `court` entre start e end.
  const overlappingBookings = (
    court: number,
    dayKey: string,
    start: number,
    end: number
  ) =>
    reservasConvertidas.filter(
      (reserva) =>
        reserva.dayKey === dayKey &&
        sharesSpaceWith(court, Number(reserva.court_number)) &&
        Number(reserva.start_date) < end &&
        Number(reserva.end_date) > start
    )

  const bookableCourts = isQuadra5 ? [5] : isField ? [0, 6] : SUB_COURTS

  const getAvailableCourts = (dayKey: string, start: number, end: number) =>
    bookableCourts.filter(
      (court) => overlappingBookings(court, dayKey, start, end).length === 0
    )

  // Motivo de o horário não estar disponível, ou null se dá pra reservar.
  const unavailableReason = (dayDate: Date, hour: number, minute: number) => {
    const start = slotTimestamp(dayDate, hour, minute)
    const end = start + BOOKING_DURATION
    const dayKey = getDateKey(dayDate)

    if (getAvailableCourts(dayKey, start, end).length > 0) return null

    const blockedByFullCourt = reservasConvertidas.some(
      (reserva) =>
        reserva.dayKey === dayKey &&
        Number(reserva.court_number) === FULL_COURT &&
        Number(reserva.start_date) < end &&
        Number(reserva.end_date) > start
    )

    if (blockedByFullCourt) {
      return 'A Quadra 4 ocupa as quadras 1, 2 e 3 — nenhuma delas pode ser reservada nesse horário'
    }

    return 'Esse horário já está todo reservado'
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
      return (hour >= 20 && minute === 1) || hour >= 21
    }
  }

  function handleClickedTime(hour: number, minute: number, dayDate: Date) {
    const timestamp = slotTimestamp(dayDate, hour, minute)

    if (timestamp < today.getTime()) {
      return
    }

    const availableCourts = getAvailableCourts(
      getDateKey(dayDate),
      timestamp,
      timestamp + BOOKING_DURATION
    )

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

  const weekDays = thisWeek()

  return (
    <div className="relative w-full">
      {getBookingsOfTheWeek?.isLoading && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-white/20 backdrop-blur-sm"
          style={{ pointerEvents: 'none' }}
        >
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
        <div className="sticky top-0 z-[40] mb-12 flex w-full bg-red-300 font-poppins text-base font-semibold text-gray-600 sm:top-[88px] sm:max-w-[100vw]">
          <div className="sticky left-0 z-[80] min-w-16 max-w-16 bg-blue-primary px-2 py-4 text-xl text-white">
            Hora
          </div>
          <div className="flex flex-1 text-center text-lg text-white">
            {weekDays.map((date, index) => (
              <div
                key={index}
                className="z-[80] flex min-w-[120px] flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-xl font-normal sm:min-w-[90px]"
              >
                <div>{date.getDate()}</div>
                <div>
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                </div>{' '}
              </div>
            ))}
          </div>
        </div>
        {[...Array(isField ? 19 : 29)].map((_, index) => {
          const hour = 8 + Math.floor(index / 2)
          const minute = index % 2
          return (
            <div key={index} className="flex min-w-[100vw] sm:min-w-0">
              <div
                style={{ height: `${SLOT_HEIGHT}px` }}
                className="sticky left-0 z-20 flex min-w-16 max-w-16 items-start border-r border-gray-400 bg-white px-4 font-poppins"
              >{`${hour}:${minute === 0 ? '00' : '30'}`}</div>
              <div className="flex flex-1">
                {weekDays.map((weekDay, dayIndex) => {
                  const weekDayKey = getDateKey(weekDay)
                  const isOutsideMonth = isOutsideCurrentMonth(weekDay)
                  const passedTime = isPassed(weekDay, hour, minute)
                  const reserveBlocked = cannotReserve(weekDay, hour, minute)
                  const takenReason = unavailableReason(weekDay, hour, minute)

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
                              : (takenReason ?? '')
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
                                  : takenReason
                                    ? toast.info(takenReason)
                                    : handleClickedTime(hour, minute, weekDay)
                      }
                      style={{ height: `${SLOT_HEIGHT}px` }}
                      className={`relative flex min-w-[120px] max-w-xl flex-1 gap-2 border-b border-r border-gray-400 sm:min-w-[90px] ${isOutsideMonth || passedTime || reserveBlocked || isLastHalfHour(hour, minute) || takenReason ? 'bg-gray-300' : 'bg-gray-200 hover:cursor-pointer hover:bg-blue-100'} p-2 last:border-r-0`}
                    >
                      {reservasConvertidas.map((reserva) => {
                        if (
                          reserva.hour === hour &&
                          reserva.minute === (minute == 1 ? 30 : 0) &&
                          reserva.dayKey === weekDayKey
                        ) {
                          const offset = getReservationOffset(reserva)
                          const slots =
                            (Number(reserva.end_date) -
                              Number(reserva.start_date)) /
                            (1000 * 60 * 30)

                          return (
                            <div
                              key={reserva.booking_id}
                              onClick={(e) => e.stopPropagation()}
                              className={cn('flex', offset.className)}
                              style={{
                                ...offset.style,
                                // o card ocupa exatamente os slots que a reserva dura
                                top: `${CARD_INSET}px`,
                                height: `${Math.max(1, slots) * SLOT_HEIGHT - CARD_INSET * 2}px`
                              }}
                            >
                              <CalendaryCard
                                court={reserva.court_number}
                                location={`Quadra ${reserva.court_number}`}
                                sport={sportToDisplay(reserva.sport)}
                                equipments={equipments}
                                time={reserva.start_date}
                                isChecked={[true, false]}
                                bookingType={reserva.type}
                                openModal={() =>
                                  handleSelectingBooking({
                                    bookingId: reserva.booking_id ?? '',
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
              bookingId={selectedBooking.bookingId}
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
