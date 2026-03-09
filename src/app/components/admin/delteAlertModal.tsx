import { useAlerts } from '@/app/hooks/use-alerts'
import { useEffect, useState } from 'react'

interface DeleteModalProps {
  onClose: () => void
  alertId: string
}

export default function DeleteAlertModal({
  onClose,
  alertId
}: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { removeAlert } = useAlerts()

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleDelete = () => {
    removeAlert(alertId)
    handleClose()
  }

  return (
    <div className={`fixed inset-0 z-[999] flex items-center justify-center`}>
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50 backdrop-blur-md duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative z-10 w-96 rounded-lg bg-white pt-8 font-poppins shadow-lg transition-all duration-200 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-3xl text-gray-500 hover:cursor-pointer hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <header className="flex h-12 w-full items-center justify-start gap-6 border-b-2 border-black px-4 pb-6">
          <h2 className="text-2xl font-semibold text-red-600">
            Deletar Alerta
          </h2>
        </header>
        <div className="flex flex-col items-center justify-center gap-6 p-8">
          <p className="text-center text-lg">
            Tem certeza que deseja deletar este alerta?
          </p>
          <div className="flex w-full justify-between gap-4">
            <button
              className="flex-1 rounded-md border border-gray-400 bg-gray-100 p-2 text-lg text-gray-700 hover:bg-gray-200"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              className="flex-1 rounded-md bg-red-600 p-2 text-lg text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
