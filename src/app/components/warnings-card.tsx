interface CardWarningsProps {
  titulo: string
  data: string
  conteudo: string
}

export function CardWarnings({ titulo, data, conteudo }: CardWarningsProps) {
  return (
    <div className="overflow-y mb-5 h-[150px] w-[500px] rounded-md bg-gray-200 font-poppins font-bold text-black">
      <div className="inline flex h-[40px] w-[400px] gap-5 pl-3 pt-2">
        <h4 className="rounded- h-[30px] w-[100px] rounded-md bg-blue-400 text-center text-lg text-white">
          {titulo}
        </h4>
        <h4 className="h-[40px] w-[120px] text-base font-semibold">{data}</h4>
      </div>
      <div className="h-[160px] w-[400px] pl-3 pt-3 text-base">
        <p>{conteudo}</p>
      </div>
    </div>
  )
}
