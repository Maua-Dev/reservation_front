import { PiPencilSimpleLine } from 'react-icons/pi'
import { Alert } from '../contexts/alerts-context'
import { useUser } from '../hooks/use-user'
import { FaRegTrashAlt } from 'react-icons/fa'

interface CardWarningsProps {
  alert: { alert: Alert }
  confirmDelete: () => void
}

export function CardWarnings({ alert, confirmDelete }: CardWarningsProps) {
  const limitarCaracteres = (texto: string) => {
    if (texto && texto.length > 120) {
      return texto.substring(0, 120) + '...'
    }
    return texto
  }
  const { user } = useUser()

  return (
    <div className="mb-5 h-[150px] w-full rounded-md bg-grey-tertiary/20 p-3 font-poppins font-bold text-black">
      <div className="flex h-[40px] items-center gap-5">
        <h4 className="h-[30px] min-w-[100px] rounded-md bg-blue-400 text-center text-lg text-white">
          {alert.alert.title}
        </h4>
        <div className="flex w-full justify-between">
          <h4 className="w-[110px] text-base font-semibold text-grey-primary">
            {new Date(alert.alert.start_date).toLocaleDateString('pt-BR')}
          </h4>
          {user?.role === 'ADMIN' && (
            <button className="flex h-[20px] w-[20px] items-center justify-end rounded-[5px]">
              <div>
                <FaRegTrashAlt
                  className="text-grey-primary duration-200 hover:text-red-500"
                  onClick={() => {
                    confirmDelete()
                  }}
                />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="flex h-[160px] w-full text-lg text-grey-primary">
        <p>{limitarCaracteres(alert.alert.description)}</p>
      </div>
    </div>
  )
}
