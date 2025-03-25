import { Button } from '@/app/components/button'
import { Confirm } from '@/app/components/confirm'
import { Modal } from '@/app/components/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IoClose } from 'react-icons/io5'

type FormProps = {
  modalities: string[]
  equipments: string[]
  options: string[]
  onClose: () => void
  isOpen: boolean
  timestamp: number
}

const formSchema = z.object({
  modality: z.string(),
  equipment: z.string(),
  needsVest: z.boolean(),
  shareCourt: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export const Form = ({
  modalities,
  equipments,
  timestamp,
  options,
  onClose
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modality: '',
      equipment: '',
      needsVest: false,
      shareCourt: false
    }
  })
  const [open, setOpen] = useState(false)
  const [selectedModality, setSelectedModality] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState('')
  const selectedDate = new Date(timestamp)

  const onSubmit = (data: FormData) => {
    console.log(data)
    onClose()
  }
  const handleClose = () => {
    onClose()
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

  return (
    <form
      onSubmit={(e) => {
        setOpen(true)
        e.preventDefault()
      }}
      onClick={(e) => e.stopPropagation()}
      className="relative flex max-h-[90vh] flex-col gap-4 overflow-y-auto rounded-xl bg-white p-10 tracking-wide text-slate-700"
    >
      <div className="flex flex-col justify-between border-b-2 border-slate-700 pb-4">
        <div className="flex justify-between">
          <p className="mt-3 font-poppins text-2xl font-bold md:text-3xl">
            Daniel Capuzzo
          </p>
          <p className="mt-3 font-poppins text-2xl font-bold md:text-3xl">
            22.001122-0
          </p>
          <IoClose
            className="absolute left-[94%] top-2 h-8 w-8 cursor-pointer md:h-10 md:w-16"
            onClick={handleClose}
          ></IoClose>
        </div>
        <p className="mt-1 font-poppins text-2xl font-medium">
          Data: {formatDate(selectedDate.getDate())}/
          {formatDate(selectedDate.getMonth() + 1)}
        </p>
      </div>

      <div className="flex w-full flex-col justify-start gap-4 font-medium md:flex-row md:items-center">
        <div className="flex w-40 items-center justify-between rounded p-1 md:w-48">
          <label className="flex-grow text-center font-poppins text-lg text-white md:text-2xl">
            <select className="inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow px-6 py-4">
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center justify-start gap-2 max-md:pt-4">
          <label className="flex items-center justify-center gap-2 font-poppins text-xl md:text-2xl">
            <p>Horário</p>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4 text-white">
              {formatDate(selectedDate.getHours())}:
              {formatDate(selectedDate.getMinutes())}
            </div>
          </label>
          <div className="flex items-center gap-2">
            <p className="font-poppins text-xl md:text-2xl">Até</p>
            <label className="inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow px-6 py-4 font-poppins text-xl text-white md:text-2xl">
              {formatDate(selectedDate.getHours() + 1)}:
              {formatDate(selectedDate.getMinutes())}
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="pt-4 text-left font-poppins text-3xl font-bold">
            Modalidade:
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 pt-4">
          {modalities.map((modality) => (
            <button
              key={modality}
              type="button"
              onClick={() => {
                setSelectedModality(modality)
                setValue('modality', modality)
              }}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 p-4 font-poppins text-lg font-medium hover:bg-black/5 active:border-b-2 md:text-xl ${selectedModality === modality ? 'border-yellow bg-yellow/10 text-yellow-secondary hover:bg-yellow/10' : 'text-slate-700'}`}
            >
              {modality}
            </button>
          ))}
          {errors.modality && (
            <p className="text-red-500">{errors.modality.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="mt-3 text-left font-poppins text-3xl font-bold">
            Equipamentos:
          </p>
        </div>
        <div className="flex items-center">
          <div className="mt-3 flex flex-wrap gap-2 pt-4">
            {equipments.map((equipment) => (
              <button
                key={equipment}
                type="button"
                onClick={() => {
                  setSelectedEquipment(equipment)
                  setValue('equipment', equipment)
                }}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 p-4 font-poppins text-lg font-medium hover:bg-black/5 active:border-b-2 md:text-xl ${selectedEquipment === equipment ? 'border-yellow bg-yellow/10 text-yellow-secondary hover:bg-yellow/10' : ''}`}
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

      <div className="mt-3 flex flex-row items-center gap-2">
        <input
          type="checkbox"
          {...register('needsVest')}
          className="h-10 w-7 border border-slate-500 p-1 md:w-8"
        />
        <p className="text-md font-poppins font-medium md:text-xl">
          Preciso de colete
        </p>
      </div>

      <div className="mt-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('shareCourt')}
            className="h-10 w-7 border border-slate-500 p-1 md:w-8"
          />
          <p className="text-md font-poppins font-medium md:text-xl">
            Aceito compartilhar quadra
          </p>
        </div>
        <div className="flex w-40 items-center justify-between rounded p-1">
          <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary px-6 py-4 font-poppins text-lg text-white active:border-b-2 md:text-2xl">
            Salvar
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Confirm
              onClose={() => setOpen(false)}
              onConfirm={handleSubmit(onSubmit)}
            />
          </Modal>
        </div>
      </div>
    </form>
  )
}
