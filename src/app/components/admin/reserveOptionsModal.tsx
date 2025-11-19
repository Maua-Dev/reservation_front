/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { CiCalendar } from 'react-icons/ci'
import { FiTool } from 'react-icons/fi'
import MaintenanceModal from './maintenanceModal'
import { BookingType } from '@/utils/enums/booking-type'

interface reserverOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  timestamp?: number
}

export default function ReserveOptionsModal({
  isOpen,
  onClose,
  timestamp
}: reserverOptionsModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isMaintainance, setIsMaintainance] = useState(false)
  const [type, setType] = useState<BookingType | undefined>(undefined)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(true)
      }, 100)
    }
  }, [isOpen])

  const handleMaintenance = () => {
    setIsMaintainance(true)
    setIsVisible(false)
    setModalOpen(true)
    setType(BookingType.MAINTENCE)
  }

  const handleReserve = () => {
    setIsMaintainance(false)
    setIsVisible(false)
    setModalOpen(true)
    setType(BookingType.COMMON)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setModalOpen(false)
      setIsMaintainance(false)
      setType(undefined)
      onClose()
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[900] flex items-center justify-center">
      {modalOpen && (
        <MaintenanceModal
          isVisible={modalOpen}
          onClose={() => handleClose()}
          isMaintainance={isMaintainance}
          timestamp={timestamp}
          type={type}
        />
      )}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`z-10 h-2/3 w-2/5 rounded-lg bg-white p-6 shadow-lg ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 w-full text-center text-lg font-bold">
          Selecione uma opção
        </h2>
        <div className="flex h-[90%] gap-4 font-poppins text-2xl">
          <button
            className="h-full w-1/2 rounded-lg bg-blue-primary px-4 py-2 text-white duration-300 hover:bg-blue-600"
            onClick={handleReserve}
          >
            <div className="flex h-3/4 w-full items-center justify-center">
              <CiCalendar size={192} />
            </div>
            <p className="flex h-1/4 w-full items-center justify-center text-center">
              Evento
            </p>
          </button>
          <button
            className="group h-full w-1/2 rounded-lg border-2 border-blue-primary text-white duration-300 hover:border-blue-600"
            onClick={handleMaintenance}
          >
            <div className="flex h-3/4 w-full items-center justify-center text-blue-primary group-hover:text-blue-600">
              <FiTool size={128} />
            </div>
            <p className="flex h-1/4 w-full items-center justify-center rounded-t-lg bg-blue-primary text-center group-hover:bg-blue-600">
              Manutenção
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
