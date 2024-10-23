import { Button } from '@/app/components/button'
import { Confirm } from '@/app/components/confirm'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'

export function FormCampoBeach() {
  const [time, setTime] = useState('12:00')
  const [selectedModality, setSelectedModality] = useState<string | null>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  )
  const [needsVest, setNeedsVest] = useState(false)
  const [shareCourt, setShareCourt] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Campo')
  const modalities = ['Futebol de Campo', 'Rugby']
  const equipments = {
    Campo: ['Bola de Futebol', 'Bola de Rugby'],
    BeachTennis: ['Raquete', 'Bola', 'Tamboréu']
  }

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

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value)
    setSelectedModality(null)
    setSelectedEquipment(null)
  }

  return (
    <form className="flex flex-col gap-4 rounded-md bg-white p-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-poppins text-4xl font-bold text-black">
            Daniel Capuzzo
          </p>
          <p className="font-poppins text-4xl font-bold text-black">
            22.001122-0
          </p>
        </div>
        <p className="font-poppins text-2xl font-medium">data: 17/09</p>
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex w-40 items-center justify-between rounded p-1">
          <label className="flex-grow text-center font-poppins text-xl font-medium">
            <select
              className="rounded bg-yellow p-1"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="Campo">Campo</option>
              <option value="BeachTennis">BeachTennis</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-poppins text-xl font-medium">Horário</p>
          <div className="flex w-40 items-center justify-between rounded bg-yellow p-1">
            <input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="ml-4 flex-grow border-none bg-yellow text-center font-poppins text-xl font-medium"
            />
          </div>
          <p className="font-poppins text-xl font-medium">Até</p>
          <label className="mr-2 rounded border border-black p-1 font-poppins text-xl font-medium">
            {getTimeOneHourLater(time)}
          </label>
        </div>
      </div>

      {selectedOption === 'Campo' && (
        <div className="flex flex-col">
          <div className="flex justify-start">
            <p className="pt-4 text-left font-poppins text-4xl font-bold text-black">
              Modalidade:
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {modalities.map((modality) => (
              <label
                key={modality}
                onClick={() => setSelectedModality(modality)}
                className={`rounded border border-black p-1 text-center font-poppins text-xl font-medium ${
                  selectedModality === modality ? 'bg-yellow' : ''
                }`}
              >
                {modality}
              </label>
            ))}
          </div>
        </div>
      )}

      {selectedOption === 'BeachTennis' && (
        <div className="flex flex-col">
          <div className="flex justify-start">
            <p className="pt-4 text-left font-poppins text-4xl font-bold text-black">
              Equipamentos:
            </p>
          </div>
          <div className="flex items-center pt-4">
            <div className="flex flex-wrap gap-4 pt-4">
              {equipments.BeachTennis.map((equipment) => (
                <label
                  key={equipment}
                  onClick={() => setSelectedEquipment(equipment)}
                  className={`rounded border border-black p-1 font-poppins text-xl font-medium ${
                    selectedEquipment === equipment ? 'bg-yellow' : ''
                  }`}
                >
                  {equipment}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'Campo' && (
        <div className="flex flex-col">
          <div className="flex justify-start">
            <p className="pt-4 text-left font-poppins text-4xl font-bold text-black">
              Equipamentos:
            </p>
          </div>
          <div className="flex items-center pt-4">
            <div className="flex flex-wrap gap-2 pt-4">
              {equipments.Campo.map((equipment) => (
                <label
                  key={equipment}
                  onClick={() => setSelectedEquipment(equipment)}
                  className={`rounded border border-black p-1 px-2 text-center font-poppins text-xl font-medium ${
                    selectedEquipment === equipment ? 'bg-yellow' : ''
                  }`}
                >
                  {equipment}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row items-center pt-4">
        <input
          type="checkbox"
          checked={needsVest}
          onChange={() => setNeedsVest(!needsVest)}
          className="mr-2 h-10 w-10 rounded border border-black p-1"
        />
        <p className="font-poppins text-xl font-medium">Preciso de colete</p>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={shareCourt}
            onChange={() => setShareCourt(!shareCourt)}
            className="mr-2 h-10 w-10 rounded border border-black p-1"
          />
          <p className="font-poppins text-xl font-medium">
            Aceito compartilhar quadra
          </p>
        </div>
        <div className="flex w-40 items-center justify-between rounded p-1">
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
