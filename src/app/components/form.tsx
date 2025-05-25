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
import { useIsAuthenticated } from '@azure/msal-react'
import { ModalityName } from '@/utils/enums/modality'

type FormProps = {
  modalities: string[]
  equipments: string[]
  options: string[]
  onClose: () => void
  isOpen: boolean
  timestamp: number
  isField: boolean
}

const formSchema = z.object({
  modality: z.string().min(1, 'Selecione uma modalidade'),
  equipment: z.array(z.string()).min(1, 'Selecione pelo menos um equipamento'),
  shareCourt: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export const Form = ({
  modalities,
  equipments,
  timestamp,
  options,
  isField,
  onClose
}: FormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modality: '',
      equipment: [],
      shareCourt: false
    }
  })
  const [open, setOpen] = useState(false)
  const [selectedModality, setSelectedModality] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])
  const [courtNumber, setCourtNumber] = useState(
    isField ? (options[0] == 'Beach' ? 6 : 0) : options[0].split(' ')[1]
  )
  const selectedDate = new Date(timestamp)
  const { createBookingMutation } = useBookingsQuery()
  const { user } = useUser()
  const isAuth = useIsAuthenticated()

  const onSubmit = async () => {
    const bookingData = {
      start_date: timestamp,
      end_date: timestamp + 3600000,
      court_number: Number(courtNumber),
      sport: selectedModality,
      materials: selectedEquipments
    }
    await createBookingMutation.mutateAsync(bookingData)
    onClose()
  }
  const handleClose = () => {
    onClose()
  }
  const modalityToEquipament: Record<string, string[]> = {
    Football: ['Bola de futebol'],
    Rugby: ['Bola de rugby'],
    'Beach Tennis': ['Raquete de beach e Tamboréu'],
    Tennis: ['Bola e Raquete de tênis'],
    Basketball: ['Bola de basquete'],
    Volleyball: ['Bola de vôlei'],
    Handball: ['Bola de handebol'],
    Futsal: ['Bola de futsal']
  }
  const equipmentToModality: Record<string, string> = {
    'Bola de futebol': 'Football',
    'Bola de rugby': 'Rugby',
    'Raquete de beach e Tamboréu': 'Beach Tennis',
    'Bola e Raquete de tênis': 'Tennis',
    'Bola de basquete': 'Basketball',
    'Bola de vôlei': 'Volleyball',
    'Bola de handebol': 'Handball',
    'Bola de futsal': 'Futsal'
  }

  const handleModalitySelect = (modality: string) => {
    setSelectedModality(modality)
    setValue('modality', modality)

    const defaultEquipment = modalityToEquipament[modality] || []
    setSelectedEquipments(defaultEquipment)
    setValue('equipment', defaultEquipment)
  }

  // const sports = () => {
  //   if (courtNumber == 0) {
  //     return modalities.filter((mod) => mod == 'Rugby' || mod == 'Football')
  //   } else {
  //     return modalities.filter((mod) => mod == 'Beach Tennis')
  //   }
  // }
  const sports = () => {
    if (isField) {
      if (courtNumber == 6) {
        return ['Beach Tennis']
      }
      return ['Football', 'Rugby']
    }
    return ['Tennis', 'Basketball', 'Volleyball', 'Handball', 'Futsal']
  }
  const equipamento = () => {
    if (isField) {
      if (courtNumber == 6) {
        return ['Raquete de beach e Tamboréu']
      }
      return ['Bola de futebol', 'Bola de rugby']
    }
    return [
      'Bola e Raquete de tênis',
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

  if (!isAuth) {
    return (
      <div className="flex w-full justify-center bg-transparent p-4 md:p-8">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[90vh] min-h-[30vh] w-[50vw] max-w-[70vw] items-center justify-center rounded-lg bg-white p-4 font-poppins"
        >
          <p className="text-3xl">Você não está logado</p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        setOpen(true)
        e.preventDefault()
      }}
      onClick={(e) => e.stopPropagation()}
      className="relative flex max-h-[90vh] w-[90%] max-w-[70vw] cursor-default flex-col gap-3 overflow-x-hidden overflow-y-visible rounded-xl bg-white px-4 py-6 tracking-wide text-slate-700 shadow-lg sm:w-[70%]"
    >
      <div className="flex flex-col justify-between border-b-2 border-slate-700">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between md:flex-row md:gap-72">
            <p className="font-poppins text-2xl font-bold md:text-3xl">
              {user.name}
            </p>
            <p className="left-[75%] mr-4 font-poppins text-2xl font-bold md:text-3xl">
              {user.ra}
            </p>
          </div>
          <IoClose
            className="absolute left-[85%] top-2 mr-1 h-8 w-8 cursor-pointer md:left-[94%] md:h-10 md:w-16"
            onClick={handleClose}
          ></IoClose>
        </div>
        <p className="mt-1 font-poppins text-2xl font-medium">
          Data: {formatDate(selectedDate.getDate())}/
          {formatDate(selectedDate.getMonth() + 1)}
        </p>
      </div>

      <div className="flex w-full flex-col justify-start gap-2 font-medium md:flex-row">
        <div className="flex w-32 items-center justify-between rounded">
          <label className="flex-grow text-center font-poppins text-lg text-white">
            <select
              defaultValue={courtNumber}
              onChange={(e) => {
                setCourtNumber(e.target.value)
              }}
              className="inline-flex items-start justify-start rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2"
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
          </label>
        </div>
        <div className="flex flex-col items-start justify-start gap-1 md:flex-row">
          <label className="flex items-center justify-center gap-1 font-poppins text-xl">
            <span></span>
            <p>Horário</p>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2 text-white">
              {formatDate(selectedDate.getHours())}:
              {formatDate(selectedDate.getMinutes())}
            </div>
          </label>
          <div className="flex items-center gap-2">
            <p className="font-poppins text-xl">Até</p>
            <label className="inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2 font-poppins text-xl text-white">
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
            {sports().map((modality) => (
              <button
                key={modality}
                type="button"
                onClick={() => handleModalitySelect(modality)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 p-2 font-poppins text-lg font-medium hover:bg-black/5 active:border-b-2 ${
                  selectedModality === modality
                    ? 'border-yellow bg-yellow/10 text-yellow-secondary hover:bg-yellow/10'
                    : 'text-slate-700'
                }`}
              >
                {ModalityName[modality as keyof typeof ModalityName]}
              </button>
            ))}
            {errors.modality && (
              <p className="text-red-500">{errors.modality.message}</p>
            )}
          </div>
          {selectedModality == 'Volleyball' && (
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
                  const modality = equipmentToModality[equipment]
                  if (modality) {
                    setSelectedModality(modality)
                    setValue('modality', modality)
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

        <div className="flex items-center justify-between">
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
            <div className="flex items-center">
              {selectedEquipments.includes('Colete')}Colete
            </div>
          </button>
          <div className="flex justify-end">
            <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary px-5 py-2 font-poppins text-lg text-white active:border-b-2">
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          {...register('needsVest')}
          className="h-6 w-7 border border-slate-500 p-1 md:w-6"
        />
        <p className="text-md font-poppins font-medium md:text-xl">
          Preciso de colete
        </p>
      </div> */}

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
