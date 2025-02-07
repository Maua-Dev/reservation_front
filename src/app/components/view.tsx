import { IoClose } from 'react-icons/io5'
import { ReservationCard } from './reservation-view'

export function View() {
  const handleCancel = (date: string) => {
    console.log(`Cancel reservation on ${date}`)
  }
  const handleClose = () => {
    console.log('Close button clicked')
  }

  return (
    <div className="flex w-full justify-center bg-black/20 p-4 md:p-8">
      <div className="w-5/6 max-w-xl rounded-lg bg-white p-4 font-poppins md:w-3/4">
        <div className="flex flex-col justify-between py-2 md:py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-black sm:text-base md:text-xl">
              Daniel Capuzzo
            </p>
            <p className="text-sm font-bold text-black sm:text-base md:text-xl">
              22.001122-0
            </p>
            <IoClose
              className="h-8 w-8 cursor-pointer md:h-10 md:w-16"
              onClick={handleClose}
            ></IoClose>
          </div>
          <hr className="border-t-4 border-black" />
        </div>
        <div className="flex max-w-xl flex-col items-center justify-center gap-4">
          <ReservationCard
            startDate={1733929200000}
            endDate={1733932800000}
            court="1"
            status="Aprovado"
            onCancel={() => handleCancel('12/12')}
          />
          <ReservationCard
            startDate={1734372000000}
            endDate={1734375600000}
            court="1"
            status="Aprovado"
            onCancel={() => handleCancel('16/12')}
          />
          <ReservationCard
            startDate={1734699600000}
            endDate={1734703200000}
            court="2"
            status="Aprovado"
            onCancel={() => handleCancel('20/12')}
          />
          <p className="self-end text-end font-poppins text-xs font-medium text-black md:text-base">
            * Reservas sujeitas a cancelamento
          </p>
        </div>
      </div>
    </div>
  )
}
