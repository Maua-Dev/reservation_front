import imgCampo from '../assets/imagem-campo.png'
import imgQuadra from '../assets/imagem-quadra.png'
import imgBeachTenis from '../assets/imagem-beachtenis.png'
import { Button } from './button'

export function Reservations() {
  return (
    <div>
      <div className="text-center md:pt-12 lg:mb-12">
        <h1 className="p-7 pt-[100px] font-league text-[2.2rem] font-bold text-[#0080F5] lg:text-[5rem]">
          Reserve seu espaço!
        </h1>
        <p className="mt-4 hidden p-4 font-poppins text-[2.5rem] font-normal text-[#0080F5] lg:block">
          O Reservation Mauá é o sistema de reserva de salas, auditórios e
          quadras do<br></br> Instituto Mauá de Tecnologia, projetado para
          facilitar o agendamento de espaços<br></br> para estudos, reuniões e
          eventos acadêmicos.
        </p>
      </div>
      <div className="flex justify-center gap-2 lg:gap-20 lg:px-[200px]">
        <div className="w-full max-w-[119px] lg:max-w-[520px]">
          <img
            src={imgCampo}
            alt="Imagem do campo"
            className="h-[177px] w-full rounded-t-xl object-cover lg:h-[773px]"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] text-center text-white lg:px-4 lg:py-4">
            <h1 className="py-2 font-league text-[15px] font-bold lg:p-4 lg:text-[2.5rem]">
              Campo
            </h1>
            <p className="hidden p-4 font-poppins text-[1.25rem] lg:block">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
            </p>
            <div className="flex justify-center">
              <Button className="mb-4 mt-4 flex h-[13px] w-[69px] items-center justify-center font-league text-[13px] font-bold lg:h-[41px] lg:w-[301px] lg:text-2xl">
                Reservar
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[119px] lg:max-w-[520px]">
          <img
            src={imgQuadra}
            alt="Imagem da quadra"
            className="h-[177px] w-full rounded-t-xl object-cover lg:h-[773px]"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] text-center text-white lg:px-4 lg:py-4">
            <h1 className="py-2 font-league text-[15px] font-bold lg:p-4 lg:text-[2.5rem]">
              Quadra
            </h1>
            <p className="hidden p-4 font-poppins text-[1.25rem] lg:block">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
            </p>
            <div className="flex justify-center">
              <Button className="mb-4 mt-4 flex h-[13px] w-[69px] items-center justify-center font-league text-[13px] font-bold lg:h-[41px] lg:w-[301px] lg:text-2xl">
                Reservar
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[119px] lg:max-w-[520px]">
          <img
            src={imgBeachTenis}
            alt="Imagem do Beach Tênis"
            className="h-[177px] w-full rounded-t-xl object-cover lg:h-[773px]"
          />
          <div className="rounded-b-xl bg-[#0080F5] text-center text-white lg:h-auto lg:px-4 lg:py-4">
            <h1 className="py-2 font-league text-[15px] font-bold lg:p-4 lg:text-[2.5rem]">
              Beach Tênis
            </h1>
            <p className="hidden p-4 font-poppins text-[1.25rem] lg:block">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
            </p>
            <div className="flex justify-center">
              <Button className="mb-4 mt-4 flex h-[13px] w-[69px] items-center justify-center font-league text-[13px] font-bold lg:h-[41px] lg:w-[301px] lg:text-2xl">
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
