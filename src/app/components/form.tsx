import { Button } from '@/app/components/button'
import { Confirm } from '@/app/components/confirm'
import { Modal } from '@/app/components/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormProps = {
  modalities: string[]
  equipments: string[]
  options: string[]
  onClose: () => void
}

const formSchema = z.object({
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  modality: z.string(),
  equipment: z.string(),
  needsVest: z.boolean(),
  shareCourt: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export const Form = ({
  modalities,
  equipments,
  options,
  onClose
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: '12:00',
      modality: '',
      equipment: '',
      needsVest: false,
      shareCourt: false
    }
  })
  const [open, setOpen] = useState(false)
  const [selectedModality, setSelectedModality] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState('')

  const getTimeOneHourLater = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(hours + 1, minutes)
    return date.toTimeString().slice(0, 5)
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
    onClose()
  }

  const time = watch('time')

  return (
    <form
      onSubmit={(e) => {
        setOpen(true)
        e.preventDefault()
      }}
      className="flex flex-col gap-4 bg-white p-4"
    >
      <div className="flex flex-col justify-between pb-3">
        <div className="flex justify-between">
          <p className="mt-3 font-poppins text-2xl font-bold text-black md:text-3xl">
            Daniel Capuzzo
          </p>
          <p className="mt-3 font-poppins text-2xl font-bold text-black md:text-3xl">
            22.001122-0
          </p>
        </div>
        <p className="mt-1 font-poppins text-2xl font-medium">data: 17/09</p>
      </div>

      <div className="flex w-full flex-col justify-start gap-4 md:flex-row md:items-center">
        <div className="flex w-40 items-center justify-between rounded bg-yellow p-1 md:w-48">
          <label className="flex-grow text-center font-poppins text-lg font-medium md:text-2xl">
            <select className="bg-yellow">
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center justify-start gap-2 max-md:pt-4">
          <label className="flex items-center justify-center gap-2 font-poppins text-xl font-medium md:text-2xl">
            <p>Horário</p>
            <input
              type="time"
              {...register('time')}
              className="rounded border-none bg-yellow p-[4px] text-center font-poppins text-lg font-medium md:text-2xl"
            />
            {errors.time && (
              <p className="text-red-500">{errors.time.message}</p>
            )}
          </label>
          <div className="flex items-center gap-2">
            <p className="font-poppins text-xl font-medium md:text-2xl">Até</p>
            <label className="rounded border border-black p-1 font-poppins text-xl font-medium md:text-2xl">
              {getTimeOneHourLater(time)}
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="pt-4 text-left font-poppins text-3xl font-bold text-black">
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
              className={`text-md w-24 rounded border border-black p-1 font-poppins font-medium md:w-36 md:text-lg ${selectedModality === modality ? 'bg-yellow' : ''}`}
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
          <p className="mt-3 text-left font-poppins text-3xl font-bold text-black">
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
                className={`text-md w-24 rounded border border-black p-1 font-poppins font-medium md:w-44 md:text-lg ${selectedEquipment === equipment ? 'bg-yellow' : ''}`}
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
          className="h-10 w-7 rounded border border-black p-1 md:w-8"
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
            className="h-10 w-7 rounded border border-black p-1 md:w-8"
          />
          <p className="text-md font-poppins font-medium md:text-xl">
            Aceito compartilhar quadra
          </p>
        </div>
        <div className="flex w-40 items-center justify-between rounded p-1">
          <Button>Salvar</Button>
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
