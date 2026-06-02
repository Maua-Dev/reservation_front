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
  type,
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
      0: ['Football', 'Rugby', SportName.NA, 'Atividades Academicas ou Eventos', 'Funcional'],
      6: ['Beach Tennis', SportName.NA],
      1: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', SportName.NA, 'Tenis de Mesa', 'Atividades Academicas ou Eventos', 'Funcional', 'Judo'],
      2: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', SportName.NA, 'Tenis de Mesa', 'Atividades Academicas ou Eventos', 'Funcional', 'Judo'],
      3: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', SportName.NA, 'Tenis de Mesa', 'Atividades Academicas ou Eventos', 'Funcional', 'Judo'],
      4: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', SportName.NA, 'Tenis de Mesa', 'Atividades Academicas ou Eventos', 'Funcional', 'Judo'],
      5: ['Natação']
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
      'Tenis de Mesa': ['Raquete e Bolinha'],
      Corrida: [],
      Natação: [],
      [SportName.NA]: [],
      'Atividades Academicas': [],
      Funcional: [],
      Judo: []
    }),
    []
  )

  useEffect(() => {
    if (validSelectedSport && sportMaterials[validSelectedSport]) {
      setSelectedMaterials(sportMaterials[validSelectedSport])
    } else {
      setSelectedMaterials([])
    }
  }, [validSelectedSport, sportMaterials])

  const handleBook = async () => {
    // Normalização estrita para evitar quebras por milissegundos residuais
    const startObj = new Date(Number(timestamp))
    startObj.setSeconds(0, 0)
    const start = startObj.getTime()

    const computedEnd = new Date(start)
    computedEnd.setHours(endHour)
    computedEnd.setMinutes(endMinute)
    computedEnd.setSeconds(0, 0)

    const endDateMs =
      computedEnd.getTime() <= start
        ? start + 3600000 
        : computedEnd.getTime()

    if (weekData?.bookings) {
      // 1. Caso selecione a Quadra 4 (Completa) -> Cancela as sub-quadras 1, 2 e 3
      if (selectedCourt === 4) {
        const courtsToCancel = [1, 2, 3]
        
        const overlappingSubCourts = weekData.bookings.filter(
          (b) =>
            courtsToCancel.includes(Number(b.court_number)) &&
            Number(b.start_date) < endDateMs &&
            Number(b.end_date) > start
        )

        if (overlappingSubCourts.length > 0) {
          const deletePromises = overlappingSubCourts.map((booking) => {
            if (booking.booking_id) {
              return deleteBookingMutation.mutateAsync(booking.booking_id)
            }
            return Promise.resolve()
          })
          await Promise.all(deletePromises)
        }
      }

      // 2. Caso selecione sub-quadra (1, 2 ou 3) -> Cancela a Quadra 4 se houver sobreposição
      if ([1, 2, 3].includes(selectedCourt)) {
        const overlappingCourt4 = weekData.bookings.find(
          (b) =>
            Number(b.court_number) === 4 &&
            Number(b.start_date) < endDateMs &&
            Number(b.end_date) > start
        )

        if (overlappingCourt4?.booking_id) {
          await deleteBookingMutation.mutateAsync(overlappingCourt4.booking_id)
        }
      }

      // 3. Manutenção limpa reservas anteriores do mesmo local
      if (isMaintainance) {
        const overlappingSameCourt = weekData.bookings.find(
          (b) =>
            Number(b.court_number) === selectedCourt &&
            Number(b.start_date) < endDateMs &&
            Number(b.end_date) > start
        )
        if (overlappingSameCourt?.booking_id) {
          await deleteBookingMutation.mutateAsync(overlappingSameCourt.booking_id)
        }
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

    // Força a atualização do cache global antes de fechar a janela
    await getBookingsOfTheWeek.refetch()
    handleClose()
  }

  const courts = useMemo(
    () => [
      { value: 6, label: 'Beach Tenis' },
      { value: 0, label: 'Campo' },
      { value: 1, label: 'Quadra 1' },
      { value: 2, label: 'Quadra 2' },
      { value: 3, label: 'Quadra 3' },
      { value: 4, label: 'Quadra 4' },
      { value: 5, label: 'Natação' }
    ],
    []
  )

  const { occupiedCourtsSet, occupiedCourtsToHide } = useMemo(() => {
    if (!weekData?.bookings || !timestamp)
      return {
        occupiedCourtsSet: new Set<number>(),
        occupiedCourtsToHide: new Set<number>()
      }
    const start = Number(timestamp)
    const end = start + 3600000
    const overlapping = weekData.bookings.filter(
      (b) => Number(b.start_date) < end && Number(b.end_date) > start
    )
    const raw = new Set<number>()
    overlapping.forEach((b) => raw.add(Number(b.court_number)))
    const toHide = new Set<number>(raw)
    
    if (toHide.has(4)) {
      toHide.add(1)
      toHide.add(2)
      toHide.add(3)
    }
    return { occupiedCourtsSet: raw, occupiedCourtsToHide: toHide }
  }, [weekData, timestamp])

  const availableCourts = useMemo(
    () =>
      isMaintainance
        ? courts
        : courts.filter((c) => !occupiedCourtsToHide.has(c.value)),
    [courts, occupiedCourtsToHide, isMaintainance]
  )

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

  // Bloqueia cliques se a API estiver carregando os dados da semana atualizados
  const isActionDisabled =
    createBookingMutation.isPending || 
    deleteBookingMutation.isPending || 
    weekIsLoading

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
        
        {/* Adicionado o atributo disabled nativo na tag button para travar cliques paralelos */}
        <button
          onClick={handleBook}
          disabled={isActionDisabled}
        >
          <div className={`absolute bottom-4 right-4 flex w-40 items-center justify-center rounded-md bg-blue-primary p-2 text-xl text-white hover:cursor-pointer hover:text-gray-200 ${isActionDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isActionDisabled ? (
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
            <div className="flex h-12 w-full items-center justify-between gap-2 rounded-sm bg-yellow p-2">
              <h1>Data:</h1>
              <p>{date}</p>
            </div>
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
                        <option value={0}>00</option>
                      )}
                      {endHour !== 22 && <option value={30}>30</option>}
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