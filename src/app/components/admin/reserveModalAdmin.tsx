import { useEffect, useState } from "react"

/* eslint-disable prettier/prettier */
interface ReserveModalProps {
  isVisible: boolean
  onClose: () => void
}

const modalidade = [
  "Futebol",
  "Handbol",
  "Voleibol",
  "Basquetebol",
  "Futsal",
  "Rugby",
  "Tênis"
]

export default function ReserveModalAdmin({
  isVisible,
  onClose
}: ReserveModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsOpen(true)
      }, 300)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 100)
  }

  if (!isVisible) return null
  return (
    <div className={`fixed inset-0 z-20 flex items-center justify-center`}>
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50 backdrop-blur-md duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative z-10 h-3/4 w-3/5 rounded-lg bg-white font-poppins shadow-lg transition-all duration-200 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute right-4 top-4 text-3xl text-gray-500 hover:cursor-pointer hover:text-gray-700'
          onClick={handleClose}
        >
          &times;
        </button>
        <button>
          <div className='absolute bottom-4 right-4 w-40 rounded-md bg-blue-primary p-2 text-xl text-white hover:cursor-pointer hover:text-gray-200'>
            Salvar
          </div>
        </button>
        <header className='flex h-12 w-full items-center justify-start gap-6 border-b-2 border-black px-4 pb-6'>
          <h2 className='text-3xl font-semibold'>CEAF</h2>
          <p className='bold text-xl'>Evento</p>
        </header>
        <div className='flex h-[90%] items-start justify-start pt-8'>
          <div className='flex h-full w-1/3 flex-col items-center justify-start gap-4 px-4 py-2'>
            {/* data */}
            <div className='flex h-12 w-full items-center justify-between gap-2 rounded-sm bg-yellow p-2'>
              <h1>Data:</h1>
              <p>09/01/2025</p>
            </div>
            {/* Local */}
            <div className='flex w-full flex-col items-start justify-between gap-2 rounded-sm p-2'>
              <h1 className='text-xl font-bold'>Local</h1>
              <select className='w-full rounded-sm bg-yellow p-2'>
                <option value='1'>Beach Tenis</option>
                <option value='2'>Campo</option>
                <option value='3'>Quadra 1</option>
                <option value='4'>Quadra 2</option>
                <option value='5'>Quadra 3</option>
                <option value='6'>Quadra 4</option>
              </select>
            </div>
          </div>
          <div className='flex w-2/3 flex-col items-start justify-start gap-4 px-4 py-2'>
            {/* horario */}
            <h2 className='mb-4 w-full px-4 text-start text-2xl font-bold'>
              Horário
            </h2>
            <div className='flex w-full items-start justify-evenly gap-1'>
              <div className='flex w-2/5 flex-col items-center rounded-sm border-2 border-black/30 bg-yellow'>
                <select className='w-full rounded-sm border-b-2 border-b-black/20 bg-yellow p-2 text-center outline-none'>
                  <option value='8'>08:00</option>
                  <option value='8.5'>08:30</option>
                  <option value='9'>09:00</option>
                  <option value='9.5'>09:30</option>
                  <option value='10'>10:00</option>
                  <option value='10.5'>10:30</option>
                  <option value='11'>11:00</option>
                  <option value='11.5'>11:30</option>
                  <option value='12'>12:00</option>
                  <option value='12.5'>12:30</option>
                  <option value='13'>13:00</option>
                  <option value='13.5'>13:30</option>
                  <option value='14'>14:00</option>
                  <option value='14.5'>14:30</option>
                  <option value='15'>15:00</option>
                  <option value='15.5'>15:30</option>
                  <option value='16'>16:00</option>
                  <option value='16.5'>16:30</option>
                  <option value='17'>17:00</option>
                  <option value='17.5'>17:30</option>
                  <option value='18'>18:00</option>
                  <option value='18.5'>18:30</option>
                  <option value='19'>19:00</option>
                  <option value='19.5'>19:30</option>
                  <option value='20'>20:00</option>
                  <option value='20.5'>20:30</option>
                  <option value='21'>21:00</option>
                  <option value='21.5'>21:30</option>
                </select>
                <div className='flex w-full items-center justify-center gap-2 p-2'>
                  <div className='flex h-16 w-1/3 items-center justify-center rounded-md border-2 border-black/20 shadow-inner'>
                    09
                  </div>
                  <div>:</div>
                  <div className='flex h-16 w-1/3 items-center justify-center rounded-md border-2 border-black/20 shadow-inner'>
                    00
                  </div>
                </div>
              </div>
              <p>Até</p>
              <div className='flex w-2/5 flex-col items-center rounded-sm border-2 border-black/30 bg-yellow'>
                <select className='w-full rounded-sm border-b-2 border-b-black/20 bg-yellow p-2 text-center outline-none'>
                  <option value='8'>08:00</option>
                  <option value='8.5'>08:30</option>
                  <option value='9'>09:00</option>
                  <option value='9.5'>09:30</option>
                  <option value='10'>10:00</option>
                  <option value='10.5'>10:30</option>
                  <option value='11'>11:00</option>
                  <option value='11.5'>11:30</option>
                  <option value='12'>12:00</option>
                  <option value='12.5'>12:30</option>
                  <option value='13'>13:00</option>
                  <option value='13.5'>13:30</option>
                  <option value='14'>14:00</option>
                  <option value='14.5'>14:30</option>
                  <option value='15'>15:00</option>
                  <option value='15.5'>15:30</option>
                  <option value='16'>16:00</option>
                  <option value='16.5'>16:30</option>
                  <option value='17'>17:00</option>
                  <option value='17.5'>17:30</option>
                  <option value='18'>18:00</option>
                  <option value='18.5'>18:30</option>
                  <option value='19'>19:00</option>
                  <option value='19.5'>19:30</option>
                  <option value='20'>20:00</option>
                  <option value='20.5'>20:30</option>
                  <option value='21'>21:00</option>
                  <option value='21.5'>21:30</option>
                </select>
                <div className='flex w-full items-center justify-center gap-2 p-2'>
                  <div className='flex h-16 w-1/3 items-center justify-center rounded-md border-2 border-black/20 shadow-inner'>
                    09
                  </div>
                  <div>:</div>
                  <div className='flex h-16 w-1/3 items-center justify-center rounded-md border-2 border-black/20 shadow-inner'>
                    00
                  </div>
                </div>
              </div>
            </div>
            <h2 className='w-full px-4 text-start text-2xl font-bold'>
              Modalidades
            </h2>
            <select className='ml-4 w-2/3 rounded-sm bg-yellow p-2 outline-none'>
              {modalidade.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
