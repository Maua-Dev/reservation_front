import { IoClose } from 'react-icons/io5'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible z-20 bg-black/20' : 'invisible'}`}
    >
      <div
        className={`rounded-xl bg-white p-6 shadow transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} `}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
          className="absolute right-2 top-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <IoClose size={30} />
        </button>
        {children}
      </div>
    </div>
  )
}
