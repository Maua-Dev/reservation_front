/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react"
import { CiCalendar } from "react-icons/ci"
import { FiTool } from "react-icons/fi"
import MaintenanceModal from "./maintenanceModal"
import ReserveModalAdmin from "./reserveModalAdmin"

interface reserverOptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReserveOptionsModal({
  isOpen,
  onClose
}: reserverOptionsModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMaintenance, setIsMaintenance] = useState(false)
  const [isReserve, setIsReserve] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(true)
      }, 100)
    }
  }, [isOpen])

  const handleMaintenance = () => {
    setIsVisible(false)
    setIsMaintenance(true)
  }

  const handleReserve = () => {
    setIsVisible(false)
    setIsReserve(true)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsMaintenance(false) // Resetar o estado de manutenção
      setIsReserve(false) // Resetar o estado de reserva, se necessário
      onClose()
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[900] flex items-center justify-center'>
      {isMaintenance && (
        <MaintenanceModal
          isVisible={isMaintenance}
          onClose={() => handleClose()}
        />
      )}
      {isReserve && (
        <ReserveModalAdmin
          isVisible={isReserve}
          onClose={() => handleClose()}
        />
      )}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      <div
        className={`z-10 h-2/3 w-2/5 rounded-lg bg-white p-6 shadow-lg ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='mb-4 w-full text-center text-lg font-bold'>
          Selecione uma opção
        </h2>
        <div className='flex h-[90%] gap-4 font-poppins text-2xl'>
          <button
            className='h-full w-1/2 rounded-lg bg-blue-primary px-4 py-2 text-white duration-300 hover:bg-blue-600'
            onClick={handleReserve}
          >
            <div className='flex h-3/4 w-full items-center justify-center'>
              <CiCalendar size={192} />
            </div>
            <p className='flex h-1/4 w-full items-center justify-center text-center'>
              Reserva
            </p>
          </button>
          <button
            className='group h-full w-1/2 rounded-lg border-2 border-blue-primary text-white duration-300 hover:border-blue-600'
            onClick={handleMaintenance}
          >
            <div className='flex h-3/4 w-full items-center justify-center text-blue-primary group-hover:text-blue-600'>
              <FiTool size={128} />
            </div>
            <p className='flex h-1/4 w-full items-center justify-center rounded-t-lg bg-blue-primary text-center group-hover:bg-blue-600'>
              Manutenção
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
