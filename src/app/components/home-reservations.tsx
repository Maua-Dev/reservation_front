import imagemAuditorio from '../assets/imagem-auditorio.png'
import imagemQuadras from '../assets/imagem-quadras.png'
import imagemSalas from '../assets/imagem-salas.png'
import { Button } from './button'

export function Reservations() {
  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="p-7 pt-[100px] font-league text-[5rem] font-bold text-[#0080F5]">
          Reserve seu espaço!
        </h1>
        <p className="mt-4 p-4 font-poppins text-[2.5rem] font-normal text-[#0080F5]">
          O Reservation Mauá é o sistema de reserva de salas, auditórios e
          quadras do<br></br> Instituto Mauá de Tecnologia, projetado para
          facilitar o agendamento de espaços<br></br> para estudos, reuniões e
          eventos acadêmicos.
        </p>
      </div>
      <div className="flex justify-center gap-20 px-[200px]">
        <div className="w-full max-w-[520px]">
          <img
            src={imagemAuditorio}
            alt="Imagem do auditório"
            className="h-[773px] w-full rounded-t-xl object-cover"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] py-4 text-center text-white">
            <h1 className="p-4 font-league text-[2.5rem] font-bold">
              Auditórios
            </h1>
            <p className="p-4 font-poppins text-[1.25rem]">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
              <Button className="mt-4 h-[41px] w-[301px] font-league font-bold">
                Reservar
              </Button>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[520px]">
          <img
            src={imagemQuadras}
            alt="Imagem das quadras"
            className="h-[773px] w-full rounded-t-xl object-cover"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] py-4 text-center text-white">
            <h1 className="p-4 font-league text-[2.5rem] font-bold">Salas</h1>
            <p className="p-4 font-poppins text-[1.25rem]">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
              <Button className="mt-4 h-[41px] w-[301px] font-league font-bold">
                Reservar
              </Button>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[520px]">
          <img
            src={imagemSalas}
            alt="Imagem das salas"
            className="h-[773px] w-full rounded-t-xl object-cover"
          />
          <div className="h-auto rounded-b-xl bg-[#0080F5] py-4 text-center text-white">
            <h1 className="p-4 font-league text-[2.5rem] font-bold">
              CEAF - Esportes
            </h1>
            <p className="p-4 font-poppins text-[1.25rem]">
              O Reservation Mauá é o sistema de<br></br> reserva de salas do
              Instituto Mauá de<br></br> Tecnologia, projetado para facilitar o
              <br></br> agendamento de espaços para estudos,<br></br> reuniões e
              eventos acadêmicos.
              <Button className="mt-4 h-[41px] w-[301px] font-league font-bold">
                Reservar
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
