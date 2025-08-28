import { PiPencilSimpleLine } from 'react-icons/pi'
import { Alert } from '../contexts/alerts-context'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../hooks/use-user'
import EditModal from './edit-modal'

interface CardWarningsProps {
  alert: { alert: Alert }
}

export function CardWarnings({ alert }: CardWarningsProps) {
  const limitarCaracteres = (texto: string) => {
    if (texto && texto.length > 120) {
      return texto.substring(0, 120) + '...'
    }
    return texto
  }
  console.log('alert: ', alert)
  const [showEdit, setShowEdit] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    if (!showEdit) return
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setShowEdit(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEdit])

  return (
    <div className="mb-5 h-[150px] w-full rounded-md bg-grey-tertiary/20 p-2 font-poppins font-bold text-black">
      <div className="flex h-[40px] items-center gap-5 pt-2">
        <h4 className="rounded- h-[30px] w-[100px] rounded-md bg-blue-400 text-center text-lg text-white">
          {alert.alert.title}
        </h4>
        <div className="flex gap-2">
          <h4 className="w-[110px] text-base font-semibold text-grey-primary">
            {new Date(alert.alert.start_date).toLocaleDateString('pt-BR')}
          </h4>
          <button className="flex h-[20px] w-[20px] items-center justify-end rounded-[5px]">
            {user?.role === 'ADMIN' && (
              <div>
                <PiPencilSimpleLine
                  onClick={() => {
                    setShowEdit(false)
                    setShowModal(true)
                  }}
                ></PiPencilSimpleLine>
                <div className="text-start text-2xl font-normal">
                  {showModal && (
                    <EditModal onClose={() => setShowModal(false)} />
                  )}
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="flex h-[160px] w-full pl-3 pt-3 text-base text-grey-primary">
        <p>{limitarCaracteres(alert.alert.description)}</p>
      </div>
    </div>
  )
}
