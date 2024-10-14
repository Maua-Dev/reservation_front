import { Button } from '@/app/components/button'
import { Confirm } from '@/app/components/confirm'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'

export function FormQuadra() {
  const [time, setTime] = useState('12:00')
  const [selectedModality, setSelectedModality] = useState<string | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  )
  const [selectedRacket, setSelectedRacket] = useState<string | null>(null)
  const [needsVest, setNeedsVest] = useState(false)
  const [shareCourt, setShareCourt] = useState(false)
  const [open, setOpen] = useState(false)

  const getTimeOneHourLater = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(hours + 1, minutes)
    return date.toTimeString().slice(0, 5)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const [hours] = value.split(':')
    setTime(`${hours}:00`)
  }

  const modalities = ['Basquete', 'Handbol', 'Vôlei', 'Futsal', 'Tênis']

  return (
    <form className="flex flex-col gap-4 bg-white p-4">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="mx-3 mt-3 font-poppins text-4xl font-bold text-black">
            Daniel Capuzzo
          </p>
          <p className="mx-3 mt-3 font-poppins text-4xl font-bold text-black">
            22.001122-0
          </p>
        </div>
        <p className="mx-3 mt-1 font-poppins text-2xl font-medium">
          data: 17/09
        </p>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="mx-2 flex w-40 items-center justify-between rounded bg-yellow p-1">
          <label className="flex-grow text-center font-poppins text-2xl font-medium">
            <select className="bg-yellow">
              <option>Quadra 1</option>
              <option>Quadra 2</option>
              <option>Quadra 3</option>
            </select>
          </label>
        </div>

        <div className="flex items-center">
          <p className="mx-2 font-poppins text-2xl font-medium">Horário</p>
          <div className="mx-2 flex w-40 items-center justify-between rounded bg-yellow p-1">
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="ml-4 flex-grow border-none bg-yellow text-center font-poppins text-2xl font-medium"
            />
          </div>
          <p className="mx-2 font-poppins text-2xl font-medium">Até</p>
          <label className="mr-2 rounded border border-black p-1 font-poppins text-2xl font-medium">
            {getTimeOneHourLater(time)}
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="mx-3 mt-3 pt-4 text-left font-poppins text-4xl font-bold text-black">
            Modalidade:
          </p>
        </div>

        <div className="mx-3 mt-3 flex flex-wrap gap-2 pt-4">
          {modalities.map((modality) => (
            <label
              key={modality}
              onClick={() => setSelectedModality(modality)}
              className={`mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium ${
                selectedModality === modality ? 'bg-yellow' : ''
              }`}
            >
              {modality}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="mx-3 mt-3 text-left font-poppins text-4xl font-bold text-black">
            Equipamentos:
          </p>
        </div>
        <div className="mx-3 mt-3 flex items-center pt-4">
          <p className="mr-3 font-poppins text-2xl font-bold">BOLAS:</p>
          <div className="mx-3 mt-3 flex flex-wrap gap-2 pt-4">
            {modalities.map((equipment) => (
              <label
                key={equipment}
                onClick={() => setSelectedEquipment(equipment)}
                className={`mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium ${
                  selectedEquipment === equipment ? 'bg-yellow' : ''
                }`}
              >
                {equipment}
              </label>
            ))}
          </div>
        </div>
        <div className="mx-3 mt-3 flex items-center pt-5">
          <p className="mr-3 font-poppins text-2xl font-bold">RAQUETES:</p>
          <label
            onClick={() =>
              setSelectedRacket(
                selectedRacket === 'de tênis' ? null : 'de tênis'
              )
            }
            className={`mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium ${
              selectedRacket === 'de tênis' ? 'bg-yellow' : ''
            }`}
          >
            de tênis
          </label>
        </div>
      </div>
      <div className="mx-3 mt-3 flex flex-row items-center">
        <input
          type="checkbox"
          checked={needsVest}
          onChange={() => setNeedsVest(!needsVest)}
          className="mr-2 h-10 w-10 rounded border border-black p-1"
        />
        <p className="font-poppins text-2xl font-medium">Preciso de colete</p>
      </div>

      <div className="mx-3 mt-3 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={shareCourt}
            onChange={() => setShareCourt(!shareCourt)}
            className="mr-2 h-10 w-10 rounded border border-black p-1"
          />
          <p className="font-poppins text-2xl font-medium">
            Aceito compartilhar quadra
          </p>
        </div>
        <div className="mx-2 flex w-40 items-center justify-between rounded p-1">
          <Button
            onClick={(e) => {
              setOpen(true)
              e.preventDefault()
            }}
          >
            Salvar
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Confirm onClose={() => setOpen(false)} />
          </Modal>
        </div>
      </div>
    </form>
  )
}
