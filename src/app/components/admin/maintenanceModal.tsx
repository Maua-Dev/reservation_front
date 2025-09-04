/* eslint-disable camelcase */
import { useBookingsQuery } from '@/app/hooks/use-booking'
import { useEffect, useMemo, useState } from 'react'
import { FiLoader } from 'react-icons/fi'

/* eslint-disable prettier/prettier */
interface MaintenanceModalProps {
  isVisible: boolean
  onClose: () => void
  isMaintainance?: boolean
  timestamp?: number
}

const modalidade = [
  'Football',
  'Handball',
  'Volleyball',
  'Basketball',
  'Futsal',
  'Rugby',
  'Beach Tennis',
  'Tennis',
  'Outros'
]
// const [selectedModality, setSelectedModality] = useState('')
// const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])

export default function MaintenanceModal({
  isVisible,
  onClose,
  isMaintainance,
  timestamp
}: MaintenanceModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCourt, setSelectedCourt] = useState<number>(1)
  const [selectedSport, setSelectedSport] = useState<string>(modalidade[0])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const hour = new Date(timestamp || 0).getHours()
  const minute = new Date(timestamp || 0).getMinutes()
  const date = new Date(timestamp || 0).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const { createBookingMutation, getBookingsOfTheWeek } = useBookingsQuery()

  // Esportes permitidos por local
  const allowedSportsByCourt: Record<number, string[]> = useMemo(
    () => ({
      0: ['Football', 'Rugby', 'Outros'],
      6: ['Beach Tennis', 'Outros'],
      1: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'Outros'],
      2: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'Outros'],
      3: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'Outros'],
      4: ['Volleyball', 'Basketball', 'Futsal', 'Handball', 'Tennis', 'Outros']
    }),
    []
  )

  const currentAllowedSports = useMemo(
    () => allowedSportsByCourt[selectedCourt] || modalidade,
    [allowedSportsByCourt, selectedCourt]
  )

  useEffect(() => {
    if (!currentAllowedSports.includes(selectedSport)) {
      setSelectedSport(currentAllowedSports[0])
    }
  }, [currentAllowedSports, selectedSport])
  const weekData = getBookingsOfTheWeek.data
  const weekIsLoading = getBookingsOfTheWeek.isLoading
  const refetchWeek = getBookingsOfTheWeek.refetch

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsOpen(true)
      }, 300)
      // Refetch weekly bookings when modal opens to have fresh availability
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
      Futsal: ['Bola de futsal']
    }),
    []
  )

  // Atualiza o material automaticamente ao selecionar o esporte
  useEffect(() => {
    if (selectedSport && sportMaterials[selectedSport]) {
      setSelectedMaterials(sportMaterials[selectedSport])
    } else {
      setSelectedMaterials([])
    }
  }, [selectedSport, sportMaterials])

  const handleBook = async () => {
    const bookingdata = {
      start_date: Number(timestamp),
      end_date: Number(timestamp) + 3600000,
      court_number: selectedCourt,
      sport: selectedSport,
      materials: selectedMaterials
    }
    await createBookingMutation.mutateAsync(bookingdata)

    handleClose()
    window.location.reload()
  }

  // Courts list
  const courts = useMemo(
    () => [
      { value: 6, label: 'Beach Tenis' },
      { value: 0, label: 'Campo' },
      { value: 1, label: 'Quadra 1' },
      { value: 2, label: 'Quadra 2' },
      { value: 3, label: 'Quadra 3' },
      { value: 4, label: 'Quadra 4' }
    ],
    []
  )

  // Determine which courts are booked at the selected timestamp (1h window)
  const bookedCourtsAtTime = useMemo(() => {
    if (!weekData?.bookings || !timestamp) return new Set<number>()
    const start = Number(timestamp)
    const end = start + 3600000
    const overlaps = weekData.bookings.filter(
      (b) => b.start_date < end && b.end_date > start
    )
    const set = new Set<number>()
    overlaps.forEach((b) => set.add(b.court_number))
    // Regra: se quadra 4 ocupada, esconder 1,2,3 também (0 e 6 permanecem)
    if (set.has(4)) {
      set.add(1)
      set.add(2)
      set.add(3)
    }
    return set
  }, [weekData, timestamp])

  // Available courts (exclude booked ones)
  const availableCourts = useMemo(
    () => courts.filter((c) => !bookedCourtsAtTime.has(c.value)),
    [courts, bookedCourtsAtTime]
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
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-3xl text-gray-500 hover:cursor-pointer hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <button onClick={handleBook} disabled={createBookingMutation.isPending}>
          <div className="absolute bottom-4 right-4 flex w-40 items-center justify-center rounded-md bg-blue-primary p-2 text-xl text-white hover:cursor-pointer hover:text-gray-200 disabled:opacity-70">
            {createBookingMutation.isPending ? (
              <FiLoader className="h-6 w-6 animate-spin" />
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
                  {availableCourts.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {/* Modalidade */}
            {!isMaintainance && (
              <div className="flex w-full flex-col items-start justify-between gap-2 rounded-sm p-2">
                <h1 className="text-xl font-bold">Modalidades</h1>
                <select
                  className="w-full rounded-sm bg-yellow p-2 outline-none"
                  value={selectedSport}
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
                      name="hour"
                      id=""
                      className="flex h-16 w-2/5 items-center justify-center rounded-md border-2 border-black/20 bg-white/40 p-2 shadow-inner outline-none"
                    >
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                    </select>
                    <div>:</div>
                    <select
                      name="minute"
                      id=""
                      className="flex h-16 w-2/5 items-center justify-center rounded-md border-2 border-black/20 bg-white/40 p-2 shadow-inner outline-none"
                    >
                      <option value="00">00</option>
                      <option value="30">30</option>
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
