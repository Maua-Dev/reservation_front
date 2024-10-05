import { IoChevronDown } from 'react-icons/io5'

export function Form() {
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
          <p className="flex-grow text-center font-poppins text-2xl font-medium">
            Quadras
          </p>
          <button className="ml-2">
            <IoChevronDown className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center">
          <p className="mx-2 font-poppins text-2xl font-medium">Horário</p>
          <div className="mx-2 flex w-40 items-center justify-between rounded bg-yellow p-1">
            <p className="ml-4 flex-grow text-center font-poppins text-2xl font-medium">
              12:00
            </p>
            <button className="ml-2">
              <IoChevronDown className="text-2xl" />
            </button>
          </div>
          <p className="mx-2 font-poppins text-2xl font-medium">Até</p>
          <button className="mr-2 rounded border border-black p-1 font-poppins text-2xl font-medium">
            13:00
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-start">
          <p className="mx-3 mt-3 pt-4 text-left font-poppins text-4xl font-bold text-black">
            Modalidade:
          </p>
        </div>
        <div className="mx-3 mt-3 pt-4">
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            Basquete
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            Handbol
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            Vôlei
          </button>
        </div>
        <div className="mx-3 mt-3">
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            Futsal
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            Tênis
          </button>
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
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            futebol
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            basquete
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            vôlei
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            de tênis
          </button>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            handbol
          </button>
        </div>
        <div className="mx-3 mt-3 flex items-center pt-5">
          <p className="mr-3 font-poppins text-2xl font-bold">RAQUETES:</p>
          <button className="mr-2 w-40 rounded border border-black p-1 font-poppins text-2xl font-medium">
            de tênis
          </button>
        </div>
      </div>
      <div className="mx-3 mt-3 flex flex-row items-center">
        <button className="mr-2 h-10 w-10 rounded border border-black p-1 font-poppins text-2xl font-medium"></button>
        <p className="font-poppins text-2xl font-medium">preciso de colete</p>
      </div>

      <div className="mx-3 mt-3 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <button className="mr-2 h-10 w-10 rounded border border-black p-1 font-poppins text-2xl font-medium"></button>
          <p className="font-poppins text-2xl font-medium">
            Aceito compartilhar quadra
          </p>
        </div>
        <div className="mx-2 flex w-40 items-center justify-between rounded bg-blue-500 p-1">
          <button className="flex-grow text-center font-poppins text-2xl font-medium text-white">
            Salvar
          </button>
        </div>
      </div>
    </form>
  )
}
