import { Button } from '@/app/components/button'
import { Confirm } from '@/app/components/confirm'
import { Modal } from '@/app/components/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IoClose } from 'react-icons/io5'
import { useBookingsQuery } from '../hooks/use-booking'
import { useUser } from '../hooks/use-user'
import { BookingType } from '@/utils/enums/booking-type'

type FormProps = {
  sports: string[]
  equipments: string[]
  options: string[]
  onClose: () => void
  isOpen: boolean
  timestamp: number
  isField: boolean
  isSpecialCourt?: boolean
}

const formSchema = z.object({
  sport: z.string().min(1, 'Selecione uma modalidade'),
  equipment: z.array(z.string()).min(1, 'Selecione pelo menos um equipamento'),
  shareCourt: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export const Form = ({ timestamp, options, isField, onClose }: FormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sport: '',
      equipment: [],
      shareCourt: false
    }
  })
  const [open, setOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])
  const [courtNumber, setCourtNumber] = useState<number>(() => {
    if (isField) {
      return options[0] === 'Beach' ? 6 : 0
    }

    return Number(options[0].split(' ')[1])
  })
  const selectedDate = new Date(timestamp)
  const { createBookingMutation } = useBookingsQuery()
  const { user } = useUser()
  // const FREE_ACTIVITY_SPORTS = [
  //   SportName.PING_PONG,
  //   SportName.CORRIDA,
  //   SportName.NATACAO
  // ]

  const onSubmit = async () => {
    const formValues = getValues()
    // const isFreeActivity = FREE_ACTIVITY_SPORTS.includes(
    //   formValues.sport as SportName
    // )

    const finalCourtNumber = Number(courtNumber)

    const bookingData = {
      start_date: timestamp,
      end_date: timestamp + 3600000,
      court_number: finalCourtNumber,
      sport: formValues.sport,
      type: BookingType.COMMON,
      materials: formValues.equipment
    }
    try {
      await createBookingMutation.mutateAsync(bookingData)
    } catch (error) {
      // O toast do erro já vem do onError da mutation. Aqui só garantimos que
      // o modal continua aberto pra tentar de novo, em vez de travar.
      console.error('Erro ao criar reserva:', error)
      return
    }

    // Fecha o confirm e o formulário. Sem isso o confirm ficava aberto por
    // cima e só saía da tela clicando fora.
    setOpen(false)
    onClose()
  }
  const handleClose = () => {
    onClose()
  }
  const sportToEquipament: Record<string, string[]> = {
    Football: ['Bola de futebol'],
    Rugby: ['Bola de rugby'],
    'Beach Tennis': ['Raquete e Bola'],
    Tennis: ['Bola e Raquete de tênis', 'Tamboréu e Bola'],
    Basketball: ['Bola de basquete'],
    Volleyball: ['Bola de vôlei'],
    Handball: ['Bola de handebol'],
    Futsal: ['Bola de futsal']
    // Corrida and Natação are admin-only and omitted here
    // 'Ping Pong': ['Raquete e bola de Ping Pong']
  }
  const equipmentToSport: Record<string, string> = {
    'Bola de futebol': 'Football',
    'Bola de rugby': 'Rugby',
    'Raquete e Bola': 'Beach Tennis',
    'Tamboréu e Bola': 'Tennis',
    'Bola e Raquete de tênis': 'Tennis',
    'Bola de basquete': 'Basketball',
    'Bola de vôlei': 'Volleyball',
    'Bola de handebol': 'Handball',
    'Bola de futsal': 'Futsal'
  }

  const handleSportSelect = (sport: string) => {
    setSelectedSport(sport)
    setValue('sport', sport)

    const defaultEquipment = sportToEquipament[sport]?.[0]
      ? [sportToEquipament[sport][0]]
      : []
    setSelectedEquipments(defaultEquipment)
    if (isField) {
      if (sport === 'Beach Tennis') {
        setCourtNumber(6)
      } else {
        setCourtNumber(0)
      }
    }
    setValue('equipment', defaultEquipment)
  }

  const sports = () => {
    if (isField) {
      if (options.length === 1 && options[0] === 'Beach') {
        return ['Beach Tennis']
      }
      if (options.length === 1 && options[0] === 'Campo') {
        return ['Football', 'Rugby']
      }
      return ['Football', 'Rugby', 'Beach Tennis']
    }
    // if (options.includes('Atividades Livres')) {
    //   return [SportName.PING_PONG, SportName.CORRIDA, SportName.NATACAO]
    // }
    return ['Tennis', 'Basketball', 'Volleyball', 'Handball', 'Futsal']
  }
  const equipamento = () => {
    if (isField) {
      if (options.length === 1 && options[0] === 'Beach') {
        return ['Raquete e Bola']
      }
      if (options.length === 1 && options[0] === 'Campo') {
        return ['Bola de futebol', 'Bola de rugby']
      }
      return ['Bola de futebol', 'Bola de rugby', 'Raquete e Bola']
    }
    // if (options.includes('Atividades Livres')) {
    //   return [
    //     'Raquete e bola de Ping Pong'
    //   ]
    // }
    return [
      'Bola e Raquete de tênis',
      'Tamboréu e Bola',
      'Bola de basquete',
      'Bola de vôlei',
      'Bola de handebol',
      'Bola de futsal'
    ]
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const formatDate = (date: number) => date.toString().padStart(2, '0')

  if (!user) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-white p-8">
        <p className="font-poppins text-xl text-red-500">
          Usuário não encontrado. Por favor, faça login novamente.
        </p>
      </div>
    )
  }

  return (
    <form
      // valida antes de abrir o confirm: se faltar modalidade/equipamento, o
      // confirm abria e o botão de confirmar não fazia nada (a validação
      // falhava lá dentro, em silêncio, atrás do modal)
      onSubmit={handleSubmit(() => setOpen(true))}
      onClick={(e) => e.stopPropagation()}
      className="am:overflow-y-hidden relative flex max-h-[90vh] w-[94%] max-w-2xl cursor-default flex-col gap-3 overflow-x-hidden overflow-y-visible rounded-xl bg-white px-4 py-6 tracking-wide text-slate-700 shadow-lg sm:w-[90%] md:w-[70%] md:max-w-[70vw] md:overflow-y-hidden"
    >
      <div className="flex w-full flex-col justify-between border-b-2 border-slate-700">
        <div className="flex w-full justify-between">
          <div className="min-w-0 flex-1 md:flex md:w-full md:flex-row md:justify-between">
            <p className="break-words font-poppins text-3xl font-bold leading-tight md:w-1/2 md:text-3xl md:leading-normal">
              {user.name}
            </p>
            <p className="mt-1 break-words font-poppins text-3xl font-bold leading-tight md:mt-0 md:flex md:w-1/2 md:justify-end md:pr-16 md:text-3xl md:leading-normal">
              {user.ra}
            </p>
          </div>
          <IoClose
            className="h-8 w-8 shrink-0 cursor-pointer md:absolute md:left-[94%] md:top-2 md:h-10 md:w-16"
            onClick={handleClose}
          ></IoClose>
        </div>
        <p className="mt-1 font-poppins text-2xl font-medium">
          Data: {formatDate(selectedDate.getDate())}/
          {formatDate(selectedDate.getMonth() + 1)}
        </p>
      </div>

      <div className="flex w-full flex-col justify-start gap-3 font-medium md:flex-row md:gap-2">
        <div className="flex w-fit items-center justify-between rounded md:w-32">
          <label className="flex-grow text-center font-poppins text-lg text-white">
            <select
              value={courtNumber}
              onChange={(e) => setCourtNumber(Number(e.target.value))}
              className={`${isField ? 'hidden' : ''} inline-flex items-start justify-start rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2`}
            >
              {options.map((option) => (
                <option
                  key={option}
                  value={
                    isField
                      ? option === 'Beach'
                        ? 6
                        : 0
                      : option.split(' ')[1]
                  }
                >
                  {option}
                </option>
              ))}
            </select>
            <div
              className={`${isField ? '' : 'hidden'} inline-flex items-start justify-start rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2`}
            >
              {courtNumber == 0 ? 'Campo' : `Beach`}
            </div>
          </label>
        </div>
        <div className="flex flex-col items-start justify-start gap-1 md:flex-row">
          <label className="flex items-center justify-center font-poppins text-xl">
            <span className="hidden md:inline"></span>
            <p className="mr-2 md:px-20">Horário</p>
            <div className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow px-3 py-2 font-poppins text-xl leading-none text-white">
              {formatDate(selectedDate.getHours())}:
              {formatDate(selectedDate.getMinutes())}
            </div>
          </label>
          <div className="flex items-center gap-2">
            <p className="font-poppins text-xl">Até</p>
            <label className="inline-flex min-h-11 items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow px-3 py-2 font-poppins text-xl leading-none text-white">
              {formatDate(selectedDate.getHours() + 1)}:
              {formatDate(selectedDate.getMinutes())}
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="py-1 text-left font-poppins text-2xl font-bold">
            Modalidade:
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 py-1">
            {sports().map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => handleSportSelect(sport)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 p-2 font-poppins text-lg font-medium hover:bg-black/5 active:border-b-2 ${
                  selectedSport === sport
                    ? 'border-yellow bg-yellow/10 text-yellow-secondary hover:bg-yellow/10'
                    : 'text-slate-700'
                }`}
              >
                {sport}
              </button>
            ))}
            {errors.sport && (
              <p className="text-red-500">{errors.sport.message}</p>
            )}
          </div>
          {selectedSport == 'Volleyball' && (
            <div className="flex w-[45%] items-start justify-start">
              {/* <input type="checkbox" className="h-10 w-10" /> */}
              <p className="text-md w-full text-center font-poppins font-medium text-red-600 md:text-sm">
                <span className="font-extrabold">Aviso:</span> a rede de vôlei
                para ser montada precisa de no mínimo 6 pessoas para ser montada
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="py-1 text-left font-poppins text-2xl font-bold">
            Equipamentos:
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex flex-wrap gap-2 py-1">
            {equipamento().map((equipment) => (
              <button
                key={equipment}
                type="button"
                onClick={() => {
                  setSelectedEquipments([equipment])
                  setValue('equipment', [equipment])
                  const sport = equipmentToSport[equipment]
                  if (sport) {
                    setSelectedSport(sport)
                    setValue('sport', sport)
                  }
                  if (isField) {
                    setCourtNumber(sport === 'Beach Tennis' ? 6 : 0)
                  }
                }}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 p-2 font-poppins text-lg font-medium hover:bg-black/5 active:border-b-2 ${
                  selectedEquipments.includes(equipment)
                    ? 'border-yellow bg-yellow/10 text-yellow-secondary hover:bg-yellow/10'
                    : 'text-slate-700'
                }`}
              >
                {equipment}
              </button>
            ))}
            {errors.equipment && (
              <p className="text-red-500">{errors.equipment.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-start">
          <p className="text-left font-poppins text-2xl font-bold">
            Colete de identificação:
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <button
            type="button"
            onClick={() => {
              const needsVest = !selectedEquipments.includes('Colete')
              const updatedEquipments = needsVest
                ? [...selectedEquipments, 'Colete']
                : selectedEquipments.filter((item) => item !== 'Colete')

              setSelectedEquipments(updatedEquipments)
              setValue('equipment', updatedEquipments)
            }}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 p-2 font-poppins text-lg font-medium hover:bg-black/5 active:border-b-2 ${
              selectedEquipments.includes('Colete')
                ? 'border-yellow bg-yellow/10 text-yellow-secondary hover:bg-yellow/10'
                : 'text-slate-700'
            }`}
          >
            <div className="flex items-center">Colete</div>
          </button>
          <div className="flex w-full justify-end">
            <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary px-5 py-2 font-poppins text-lg text-white active:border-b-2">
              Salvar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('shareCourt')}
            className="h-6 w-5 border border-slate-500 p-1 md:w-6"
          />
          <p className="text-md font-poppins font-medium md:text-xl">
            Aceito compartilhar quadra
          </p>
        </div> */}
        <div className="flex w-full items-center justify-between rounded">
          <Modal open={open} onClose={() => setOpen(false)}>
            <Confirm
              onClose={() => setOpen(false)}
              onConfirm={handleSubmit(onSubmit)}
              isLoading={createBookingMutation.status === 'pending'}
            />
          </Modal>
        </div>
      </div>
    </form>
  )
}
