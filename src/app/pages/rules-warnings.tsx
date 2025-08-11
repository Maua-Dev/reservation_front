export default function RulesWarnings() {
  return (
    <div className="bg-red-30 flex h-[100vh] w-full flex-col items-center justify-start pt-20">
      {/* <p className="text-4xl">Rules and warnings here</p> */}
      <div className="flex h-[80px] w-[900px] items-center justify-center bg-blue-primary text-center text-base text-white">
        <p>Avisos e Regras</p>
      </div>
      <div className="flex h-[10px] w-full items-start justify-between px-96 pl-20 pt-12 text-xl text-blue-700">
        <div>
          <p>Avisos</p>
        </div>
        <div>
          <p>Regras</p>
        </div>
      </div>
    </div>
  )
}
