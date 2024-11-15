import { IoClose } from 'react-icons/io5'
import { Button } from './button'

export function View() {
  return (
    <div className="flex w-full justify-center bg-black/20 p-4 md:p-8">
      <div className="w-5/6 max-w-xl rounded-lg bg-white p-4 md:w-3/4">
        <div className="flex flex-col justify-between py-2 md:py-4">
          <div className="flex items-center justify-between">
            <p className="font-poppins text-sm font-bold text-black sm:text-base md:text-xl">
              Daniel Capuzzo
            </p>
            <p className="font-poppins text-sm font-bold text-black sm:text-base md:text-xl">
              22.001122-0
            </p>
            <IoClose className="h-8 w-8 cursor-pointer md:h-10 md:w-16"></IoClose>
          </div>
          <hr className="border-t-4 border-black" />
        </div>
        <div className="flex max-w-xl flex-col items-center justify-center gap-4">
          <div className="flex h-36 w-full cursor-pointer flex-row items-start rounded-lg bg-blue-primary p-4 md:h-44">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-xl font-bold text-white md:text-2xl">
                12/11
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Hora: 15:00 - 16:00
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Quadra: 1
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Status: Aprovado
              </p>
            </div>
            <div className="ml-auto flex flex-col justify-end">
              <Button className="h-8 w-20 bg-white p-2 text-sm font-bold text-black hover:bg-red-600 md:w-36 lg:h-10 lg:text-lg">
                Cancelar
              </Button>
            </div>
          </div>
          <div className="items-star flex h-36 w-full max-w-xl cursor-pointer flex-row items-start rounded-lg bg-blue-primary p-4 md:h-44">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-xl font-bold text-white md:text-2xl">
                16/11
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Hora: 14:00 - 15:00
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Quadra: 1
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Status: Aprovado
              </p>
            </div>
            <div className="ml-auto flex flex-col justify-end">
              <Button className="h-8 w-20 bg-white p-2 text-sm font-bold text-black hover:bg-red-600 md:w-36 lg:h-10 lg:text-lg">
                Cancelar
              </Button>
            </div>
          </div>
          <div className="items-star flex h-36 w-full max-w-xl cursor-pointer flex-row items-start rounded-lg bg-blue-primary p-4 md:h-44">
            <div className="flex flex-col gap-1">
              <p className="font-poppins text-xl font-bold text-white md:text-2xl">
                20/11
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Hora: 10:00 - 11:00
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Quadra: 2
              </p>
              <p className="font-poppins text-xs font-normal text-white sm:text-base md:text-lg">
                Status: Aprovado
              </p>
            </div>
            <div className="ml-auto flex flex-col justify-end">
              <Button className="h-8 w-20 bg-white p-2 text-sm font-bold text-black hover:bg-red-600 md:w-36 lg:h-10 lg:text-lg">
                Cancelar
              </Button>
            </div>
          </div>
          <p className="self-end text-end font-poppins text-xs font-medium text-black md:text-base">
            * Reservas sujeitas a cancelamento
          </p>
        </div>
      </div>
    </div>
  )
}
