type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ open, children, onClose }: ModalProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible z-20 bg-black/20' : 'invisible'}`}
      onClick={handleClick}
    >
      <div
        className={`max-h-[700px] w-[70%] overflow-y-auto rounded-xl bg-white shadow transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
