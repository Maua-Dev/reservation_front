/* eslint-disable camelcase */
import { useBookingsQuery } from '@/app/hooks/use-booking'
import { useEffect, useMemo, useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { BookingType } from '@/utils/enums/booking-type'
import { SportName } from '@/utils/enums/sport'

/* eslint-disable prettier/prettier */
interface MaintenanceModalProps {
  isVisible: boolean
  onClose: () => void
  isMaintainance?: boolean
  timestamp?: number
  type?: BookingType
}

const sports = Object.values(SportName)

export default function MaintenanceModal({
  isVisible,
  onClose,
  isMaintainance,
  timestamp,
  type
}: MaintenanceModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCourt, setSelectedCourt] = useState<number>(1)
  const [selectedSport, setSelectedSport] = useState<string>(sports[0])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [endHour, setEndHour] = useState<number>(
    new Date(timestamp || 0).getHours() + 1
  )
  const [endMinute, setEndMinute] = useState<number>(
    new Date(timestamp || 0).getMinutes()
  )
  const hour = new Date(timestamp || 0).getHours()
  const minute = new Date(timestamp || 0).getMinutes()
  const date = new Date(timestamp || 0).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const { createBookingMutation, getBookingsOfTheWeek, deleteBookingMutation } =
    useBookingsQuery()

  const allowedSportsByCourt: Record<number, string[]> = useMemo(
    () => ({
      0: ['Football', 'Rugby', 'NA'],
      6: ['Beach Tennis', 'NA'],
      1: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'NA'],
      2: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'NA'],
      3: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'NA'],
      4: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'NA'],
      5: ['Ping Pong', 'Natacao', 'Corrida', 'NA']
    }),
    []
  )

  const currentAllowedSports = useMemo(
    () => allowedSportsByCourt[selectedCourt] || sports,
    [allowedSportsByCourt, selectedCourt]
  )

  const validSelectedSport = useMemo(() => {
    return currentAllowedSports.includes(selectedSport)
      ? selectedSport
      : currentAllowedSports[0]
  }, [selectedSport, currentAllowedSports])
  const weekData = getBookingsOfTheWeek.data
  const weekIsLoading = getBookingsOfTheWeek.isLoading
  const refetchWeek = getBookingsOfTheWeek.refetch
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsOpen(true)
      }, 300)
      refetchWeek()
    }
  }, [isVisible, refetchWeek])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 100)
  }

  // Mapeamento de esporte para material
  const sportMaterials: Record<string, string[]> = useMemo(
    () => ({
      Football: ['Bola de futebol'],
      Rugby: ['Bola de rugby'],
      'Beach Tennis': ['Raquete e Bola'],
      Tennis: ['Bola e Raquete de tênis'],
      Basketball: ['Bola de basquete'],
      Volleyball: ['Bola de vôlei'],
      Handball: ['Bola de handebol'],
      Futsal: ['Bola de futsal'],
      'Ping Pong': ['Raquete e Bolinha'],
      Corrida: [],
      Natacao: [],
      NA: []
    }),
    []
  )

  // Atualiza o material automaticamente ao selecionar o esporte
  useEffect(() => {
    if (validSelectedSport && sportMaterials[validSelectedSport]) {
      setSelectedMaterials(sportMaterials[validSelectedSport])
    } else {
      setSelectedMaterials([])
    }
  }, [validSelectedSport, sportMaterials])

  const handleBook = async () => {
    // Calcula end_date baseado nos selects
    const start = Number(timestamp)
    const startDateObj = new Date(start)
    const computedEnd = new Date(start)
    computedEnd.setHours(endHour)
    computedEnd.setMinutes(endMinute)
    computedEnd.setSeconds(0)
    computedEnd.setMilliseconds(0)

    const endDateMs =
      computedEnd.getTime() <= startDateObj.getTime()
        ? start + 3600000 // fallback mínimo 1h se usuário escolher algo inválido
        : computedEnd.getTime()

    //Se for manutenção e a quadra já está ocupada no horário selecionado, cancelar a reserva existente
    if (!isMaintainance && selectedCourt === 4 && weekData?.bookings) {
      const courtsToCancel = [1, 2, 3]

      for (const courtNumber of courtsToCancel) {
        const overlappingBooking = weekData.bookings.find(
          (b) =>
            b.court_number === courtNumber &&
            b.start_date < endDateMs &&
            b.end_date > start
        )

        if (overlappingBooking?.booking_id) {
          await deleteBookingMutation.mutateAsync(overlappingBooking.booking_id)
        }
      }
    }

    if (isMaintainance && weekData?.bookings) {
      const overlapping = weekData.bookings.find(
        (b) =>
          b.court_number === selectedCourt &&
          b.start_date < endDateMs &&
          b.end_date > start
      )
      if (overlapping?.booking_id) {
        await deleteBookingMutation.mutateAsync(overlapping.booking_id)
        getBookingsOfTheWeek.refetch()
        handleClose()
        return
      }
    }

    const bookingdata = {
      start_date: start,
      end_date: endDateMs,
      court_number: selectedCourt,
      sport: isMaintainance ? 'NA' : validSelectedSport,
      materials: selectedMaterials,
      type: type
    }
    await createBookingMutation.mutateAsync(bookingdata)

    handleClose()
    getBookingsOfTheWeek.refetch()
  }

  // Courts list
  const courts = useMemo(
    () => [
      { value: 6, label: 'Beach Tenis' },
      { value: 0, label: 'Campo' },
      { value: 1, label: 'Quadra 1' },
      { value: 2, label: 'Quadra 2' },
      { value: 3, label: 'Quadra 3' },
      { value: 4, label: 'Quadra 4' },
      { value: 5, label: 'Atividades Livres' }
    ],
    []
  )

  // Courts ocupadas no horário selecionado (janela de 1h a partir do start)
  const { occupiedCourtsSet, occupiedCourtsToHide } = useMemo(() => {
    if (!weekData?.bookings || !timestamp)
      return {
        occupiedCourtsSet: new Set<number>(),
        occupiedCourtsToHide: new Set<number>()
      }
    const start = Number(timestamp)
    const end = start + 3600000
    const overlapping = weekData.bookings.filter(
      (b) => b.start_date < end && b.end_date > start
    )
    const raw = new Set<number>()
    overlapping.forEach((b) => raw.add(b.court_number))
    const toHide = new Set<number>(raw)
    // Regra de esconder 1,2,3 quando 4 ocupada só para não manutenção
    if (toHide.has(4)) {
      toHide.add(1)
      toHide.add(2)
      toHide.add(3)
    }
    return { occupiedCourtsSet: raw, occupiedCourtsToHide: toHide }
  }, [weekData, timestamp])

  // Lista de quadras disponíveis (ou todas se manutenção)
  const availableCourts = useMemo(
    () =>
      isMaintainance
        ? courts
        : courts.filter((c) => !occupiedCourtsToHide.has(c.value)),
    [courts, occupiedCourtsToHide, isMaintainance]
  )

  // Ensure selected court remains valid
  useEffect(() => {
    if (availableCourts.length > 0) {
      if (!availableCourts.some((c) => c.value === selectedCourt)) {
        setSelectedCourt(availableCourts[0].value)
      }
    } else {
      setSelectedCourt(-1)
    }
  }, [availableCourts, selectedCourt])
  if (!isVisible) return null
  return (
    <div className={`fixed inset-0 z-20 flex items-center justify-center`}>
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50 backdrop-blur-md duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`font-poppin relative z-10 h-3/4 w-3/5 rounded-lg bg-white shadow-lg transition-all duration-200 ${
          isOpen ? '' : 'translate-y-full opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-3xl text-gray-500 hover:cursor-pointer hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <button
          onClick={handleBook}
          disabled={
            createBookingMutation.isPending || deleteBookingMutation.isPending
          }
        >
          <div className="absolute bottom-4 right-4 flex w-40 items-center justify-center rounded-md bg-blue-primary p-2 text-xl text-white hover:cursor-pointer hover:text-gray-200 disabled:opacity-70">
            {createBookingMutation.isPending ||
            deleteBookingMutation.isPending ? (
              <FiLoader className="h-6 w-6 animate-spin" />
            ) : isMaintainance && occupiedCourtsSet.has(selectedCourt) ? (
              'Cancelar'
            ) : (
              'Salvar'
            )}
          </div>
        </button>
        <header className="flex h-12 w-full items-center justify-start gap-6 border-b-2 border-black px-4 pb-6">
          <h2 className="text-3xl font-semibold">CEAF</h2>
          <p className="bold text-xl">
            {isMaintainance ? 'Manutenção' : 'Evento'}
          </p>
        </header>
        <div className="flex h-[90%] items-start justify-start pt-8">
          <div className="flex h-full w-1/3 flex-col items-center justify-start gap-4 px-4 py-2">
            {/* data */}
            <div className="flex h-12 w-full items-center justify-between gap-2 rounded-sm bg-yellow p-2">
              <h1>Data:</h1>
              <p>{date}</p>
            </div>
            {/* Local */}
            <div className="flex w-full flex-col items-start justify-between gap-2 rounded-sm p-2">
              <h1 className="text-xl font-bold">Local</h1>
              {weekIsLoading ? (
                <div className="flex w-full items-center justify-center rounded-sm bg-yellow p-2 text-sm">
                  <FiLoader className="mr-2 h-5 w-5 animate-spin" />{' '}
                  Carregando...
                </div>
              ) : (
                <select
                  className="w-full rounded-sm bg-yellow p-2 outline-none disabled:opacity-60"
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(Number(e.target.value))}
                  disabled={availableCourts.length === 0}
                >
                  {availableCourts.length === 0 && (
                    <option value={-1}>Nenhuma quadra disponível</option>
                  )}
                  {availableCourts.map((c) => {
                    const ocupada = occupiedCourtsSet.has(c.value)
                    return (
                      <option key={c.value} value={c.value}>
                        {c.label}
                        {isMaintainance && ocupada ? 'Está reservada' : ''}
                      </option>
                    )
                  })}
                </select>
              )}
            </div>
            {/* Modalidade */}
            {!isMaintainance && (
              <div className="flex w-full flex-col items-start justify-between gap-2 rounded-sm p-2">
                <h1 className="text-xl font-bold">Modalidades</h1>
                <select
                  className="w-full rounded-sm bg-yellow p-2 outline-none"
                  value={validSelectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  {currentAllowedSports.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="flex w-2/3 flex-col items-start justify-start gap-4 py-2">
            <div className="flex w-full flex-col items-center justify-start gap-4 px-4 py-2">
              {/* horario */}
              <h2 className="mb-4 w-full px-4 text-start text-2xl font-bold">
                Horário
              </h2>
              <div className="flex w-full items-center justify-evenly gap-1">
                <div className="flex w-1/4 flex-col items-center rounded-sm border-2 border-black/30 bg-yellow">
                  <div className="flex w-full items-center justify-center gap-2 p-2">
                    <div className="flex h-16 w-1/3 items-center justify-center rounded-md border-2 border-black/20 shadow-inner">
                      {hour < 10 ? `0${hour}` : hour}
                    </div>
                    <div>:</div>
                    <div className="flex h-16 w-1/3 items-center justify-center rounded-md border-2 border-black/20 shadow-inner">
                      {minute < 10 ? `0${minute}` : minute}
                    </div>
                  </div>
                </div>
                <p>Até</p>
                <div className="flex w-2/5 flex-col items-center rounded-sm border-2 border-black/30 bg-yellow">
                  <div className="flex w-full items-center justify-center gap-2 p-2">
                    <select
                      name="end-hour"
                      className="flex h-16 w-2/5 items-center justify-center rounded-md border-2 border-black/20 bg-white/40 p-2 shadow-inner outline-none"
                      value={endHour}
                      onChange={(e) => setEndHour(Number(e.target.value))}
                    >
                      {Array.from(
                        { length: 22 - hour },
                        (_, i) => hour + 1 + i
                      ).map((h) => (
                        <option key={h} value={h}>
                          {h.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <div>:</div>
                    <select
                      name="end-minute"
                      className="flex h-16 w-2/5 items-center justify-center rounded-md border-2 border-black/20 bg-white/40 p-2 shadow-inner outline-none"
                      value={endMinute}
                      onChange={(e) => setEndMinute(Number(e.target.value))}
                    >
                      {endHour === 22 ? (
                        <option value={0}>00</option>
                      ) : (
                        <>
                          <option value={0}>00</option>
                          <option value={30}>30</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
