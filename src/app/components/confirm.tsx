import { IoMdCheckmark } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

type ConfirmProps = {
  onClose: () => void
}

export function Confirm({ onClose }: ConfirmProps) {
  return (
    <div className="flex h-40 w-64 flex-col rounded-xl bg-white px-2 py-4 md:h-[319px] md:w-[805px]">
      <div className="flex flex-grow items-center justify-center">
        <p className="mb-4 text-center font-poppins text-sm font-medium text-black md:text-3xl">
          Declaro estar de acordo com as normas internas do CEAF para utilização
          das instalações e materiais esportivos
        </p>
      </div>
      <div className="flex w-full">
        <button
          onClick={(e) => {
            onClose()
            e.preventDefault()
          }}
          className="flex h-10 flex-1 items-center justify-center rounded-l bg-red-600 text-white"
        >
          <IoClose className="text-3xl" />
        </button>
        <button className="flex h-10 flex-1 items-center justify-center rounded-r bg-green-700 text-white">
          <IoMdCheckmark className="text-3xl" />
        </button>
      </div>
    </div>
  )
}
