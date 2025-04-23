import { Button } from './button'

interface ReservationCardProps {
  startDate: number
  endDate: number
  court: string
  status: string
  onCancel: () => void
}

export function ReservationCardAdmin({
  startDate,
  endDate,
  court,
  onCancel
}: ReservationCardProps) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  return (
    <div className="relative flex w-full cursor-pointer flex-row items-start rounded-lg bg-blue-600/60 p-4 md:h-44">
      <div className="flex flex-col gap-1">
        <p className="flex gap-2 text-xl font-bold text-black md:text-2xl">
          {days[new Date(startDate).getDay()]} <p>-</p>
          {new Date(startDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
          })}
        </p>
        <p className="text-xs font-normal text-black sm:text-base md:text-lg">
          Hora: {new Date(startDate).getHours()}:00 -{' '}
          {new Date(endDate).getHours()}:00
        </p>
        <p className="text-xs font-normal text-black sm:text-base md:text-lg">
          Quadra: {court}
        </p>
        <div className="py-7 font-poppins">
          <input type="checkbox" />
          <label className="px-1 text-black">PRESENTE</label>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end justify-end">
        <p className="font-poppins font-bold text-black">XX.XXXXX-X</p>
        <div className="absolute top-3/4 flex items-end justify-end">
          <Button
            className="h-8 w-16 bg-transparent p-0 text-sm font-bold text-black transition-colors hover:bg-red-500"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
