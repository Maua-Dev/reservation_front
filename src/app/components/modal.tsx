type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible z-20 bg-black/20' : 'invisible'}`}
    >
      <div
        className={`w-[70%] rounded-xl bg-white shadow transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} `}
      >
        {children}
      </div>
    </div>
  )
}
