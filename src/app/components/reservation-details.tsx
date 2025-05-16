import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'

type ReservationDetailsProps = {
  location: string
  modality: string
  equipments: string[]
  time: number
  isChecked: boolean[]
  onClose: () => void
}

export const ReservationDetails = ({
  equipments,
  location,
  modality,
  time,
  isChecked,
  onClose
}: ReservationDetailsProps) => {
  const date = new Date(time)
  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }) // Format time as HH:MM

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

  return (
    <>
      <div
        className={`relative max-h-[90vh] w-[90%] max-w-[70vw] overflow-y-auto overflow-x-hidden rounded-xl bg-white text-slate-700 shadow-lg sm:w-[70%]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-5 tracking-wide">
          <div className="flex flex-col justify-between border-b-2 border-slate-700 pb-4">
            <IoClose
              className="absolute right-2 top-2 h-8 w-8 cursor-pointer md:h-10 md:w-16"
              onClick={onClose}
            ></IoClose>
            <p className="mt-1 font-poppins text-2xl font-medium">
              Data: 17/09
            </p>
          </div>

          <div className="flex w-full flex-col justify-start gap-10 font-poppins text-xl font-medium text-white lg:flex-row">
            <h1 className="inline-flex h-16 w-36 items-center justify-center text-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4">
              {location}
            </h1>
            <h1 className="inline-flex h-16 w-56 items-center justify-center whitespace-nowrap rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4">
              Horário: {formattedTime} -{' '}
              {new Date(date.getTime() + 60 * 60 * 1000).toLocaleTimeString(
                'pt-BR',
                { hour: '2-digit', minute: '2-digit' }
              )}
            </h1>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-start">
              <p className="text-left font-poppins text-2xl font-bold">
                Modalidade:
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-3 text-xl">
              <h1
                className={
                  'inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-4 font-poppins text-lg font-medium text-white md:text-xl'
                }
              >
                {modality}
              </h1>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-start">
              <p className="text-left font-poppins text-2xl font-bold">
                Equipamentos:
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex flex-wrap gap-2 pt-3">
                {equipments?.map((equipment) => (
                  <h1
                    key={equipment}
                    className={
                      'inline-flex items-center justify-center rounded-xl border border-b-4 border-yellow-secondary bg-yellow p-2 px-8 py-4 text-center font-poppins text-lg font-medium text-white md:text-xl'
                    }
                  >
                    {equipment}
                  </h1>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-row items-center gap-2">
            <div
              className={`size-8 rounded border border-slate-400 p-1 md:w-8 ${isChecked?.[0] ? 'bg-yellow' : 'bg-white'}`}
            />
            <p className="text-md font-poppins font-medium md:text-xl">
              Preciso de colete
            </p>
          </div>

          <div className="mt-3 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`size-8 rounded border border-slate-500 p-1 md:w-8 ${isChecked?.[1] ? 'bg-yellow' : 'bg-white'}`}
              />
              <p className="text-md font-poppins font-medium md:text-xl">
                Aceito compartilhar quadra
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
