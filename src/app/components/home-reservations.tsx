import imgCampo from '../assets/imagem-campo.png'
import imgQuadra from '../assets/imagem-quadra.png'
import imgBeachTenis from '../assets/imagem-beachtenis.png'
import { Button } from './button'

export function Reservations() {
  return (
    <div>
      <div className="text-center md:pt-12 lg:mb-12">
        <h1 className="p-7 pt-24 font-league text-4xl font-bold text-[#0080F5] lg:text-6xl">
          Reserve seu espaço!
        </h1>
        <p className="mt-4 hidden p-4 font-poppins text-4xl font-normal text-[#0080F5] lg:block">
          O Reservation Mauá é o sistema de reserva de salas, auditórios e
          quadras do<br></br> Instituto Mauá de Tecnologia, projetado para
          facilitar o agendamento de espaços<br></br> para estudos, reuniões e
          eventos acadêmicos.
        </p>
      </div>
      <div className="flex justify-center gap-2 lg:gap-20 lg:px-48">
        <div className="w-full max-w-xs lg:max-w-2xl">
          <img
            src={imgCampo}
            alt="Imagem do campo"
            className="h-44 w-full rounded-t-xl object-cover lg:h-5/6"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] text-center text-white lg:px-4 lg:py-4">
            <h1 className="py-2 font-league text-sm font-bold lg:p-4 lg:text-4xl">
              Campo
            </h1>
            <p className="hidden p-4 font-poppins text-xl lg:block">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
            </p>
            <div className="flex justify-center">
              <Button className="mb-4 mt-4 flex h-4 w-16 items-center justify-center font-league text-sm font-bold lg:h-10 lg:w-72 lg:text-2xl">
                Reservar
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs lg:max-w-2xl">
          <img
            src={imgQuadra}
            alt="Imagem da quadra"
            className="h-44 w-full rounded-t-xl object-cover lg:h-5/6"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] text-center text-white lg:px-4 lg:py-4">
            <h1 className="py-2 font-league text-sm font-bold lg:p-4 lg:text-4xl">
              Quadra
            </h1>
            <p className="hidden p-4 font-poppins text-xl lg:block">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
            </p>
            <div className="flex justify-center">
              <Button className="mb-4 mt-4 flex h-4 w-16 items-center justify-center font-league text-sm font-bold lg:h-10 lg:w-72 lg:text-2xl">
                Reservar
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs lg:max-w-2xl">
          <img
            src={imgBeachTenis}
            alt="Imagem do Beach Tênis"
            className="h-44 w-full rounded-t-xl object-cover lg:h-5/6"
          />
          <div className="rounded-b-xl bg-[#0080F5] text-center text-white lg:h-auto lg:px-4 lg:py-4">
            <h1 className="py-2 font-league text-sm font-bold lg:p-4 lg:text-4xl">
              Beach Tênis
            </h1>
            <p className="hidden p-4 font-poppins text-xl lg:block">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
            </p>
            <div className="flex justify-center">
              <Button className="mb-4 mt-4 flex h-4 w-16 items-center justify-center font-league text-sm font-bold lg:h-10 lg:w-72 lg:text-2xl">
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
