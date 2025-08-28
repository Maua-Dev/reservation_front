import { PiPencilSimpleLine } from 'react-icons/pi'
import { Alert } from '../contexts/alerts-context'

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
            <PiPencilSimpleLine></PiPencilSimpleLine>
          </button>
        </div>
      </div>
      <div className="flex h-[160px] w-full pl-3 pt-3 text-base text-grey-primary">
        <p>{limitarCaracteres(alert.alert.description)}</p>
      </div>
    </div>
  )
}
