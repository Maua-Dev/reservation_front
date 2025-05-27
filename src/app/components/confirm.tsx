import { FiLoader } from 'react-icons/fi'
import { IoMdCheckmark } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'

type ConfirmProps = {
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export function Confirm({ onClose, onConfirm, isLoading }: ConfirmProps) {
  return (
    <div className="flex h-40 w-full flex-col items-center justify-center gap-4 rounded-xl bg-white px-0 pt-4 md:h-56 md:w-[50vw] lg:w-[30vw]">
      <div className="flex flex-grow items-center justify-center px-8 py-2">
        <p className="text-center font-poppins text-sm font-medium text-black md:text-xl">
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
          className="flex h-10 flex-1 w-1/2 items-center justify-center rounded-bl bg-red-600 text-white"
        >
          <IoClose className="text-3xl" />
        </button>
        <button
          onClick={(e) => {
            if (!isLoading) {
              onConfirm()
              e.preventDefault()
            }
          }}
          className="flex h-10 flex-1 w-1/2 items-center justify-center rounded-br bg-green-700 text-white"
        >
          {isLoading ? (
            <FiLoader className="animate-spin" />
          ) : (
            <IoMdCheckmark className="text-3xl" />
          )}
        </button>
      </div>
    </div>
  )
}
