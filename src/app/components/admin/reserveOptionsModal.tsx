interface reserverOptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReserveOptionsModal({
  isOpen,
  onClose
}: reserverOptionsModalProps) {
  if (!isOpen) return null
  return (
    <div className='fixed inset-0 z-[900] flex items-center justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-50' onClick={onClose} />
      <div
        className='z-10 h-2/3 w-2/5 rounded-lg bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='mb-4 w-full text-center text-lg font-bold'>
          Selecione uma opção
        </h2>
        <div className='flex h-[90%] gap-2 p-4'>
          <button className='h-full w-1/2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            Reserva
          </button>
          <button className='h-full w-1/2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'>
            Manutenção
          </button>
        </div>
      </div>
    </div>
  )
}
