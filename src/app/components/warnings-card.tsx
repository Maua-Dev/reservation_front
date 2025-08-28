import { PiPencilSimpleLine } from 'react-icons/pi'

interface CardWarningsProps {
  titulo: string
  data: string
  conteudo: string
}

export function CardWarnings({ titulo, data, conteudo }: CardWarningsProps) {
  const limitarCaracteres = (texto: string) => {
    if (texto.length > 120) {
      return texto.substring(0, 120) + '...'
    }
    return texto
  }

  return (
    <div className="mb-5 h-[150px] w-full rounded-md bg-grey-tertiary/20 p-2 font-poppins font-bold text-black">
      <div className="flex h-[40px] items-center gap-5 pt-2">
        <h4 className="rounded- h-[30px] w-[100px] rounded-md bg-blue-400 text-center text-lg text-white">
          {titulo}
        </h4>
        <div className="flex gap-2">
          <h4 className="w-[110px] text-base font-semibold text-grey-primary">
            {data}
          </h4>
          <button className="flex h-[20px] w-[20px] items-center justify-end rounded-[5px]">
            <PiPencilSimpleLine></PiPencilSimpleLine>
          </button>
        </div>
      </div>
      <div className="flex h-[160px] w-full pl-3 pt-3 text-base text-grey-primary">
        <p>{limitarCaracteres(conteudo)}</p>
      </div>
    </div>
  )
}
