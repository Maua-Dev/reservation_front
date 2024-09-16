import imgCampo from '../assets/imagem-campo.png'
import imgQuadra from '../assets/imagem-quadra.png'
import imgBeachTenis from '../assets/imagem-beachtenis.png'
import { ReservationCard } from './reservation-card'

const reservations = [
  {
    image: imgCampo,
    title: 'Campo',
    description:
      'O Reservation Mauá é o sistema de reserva de salas do Instituto Mauá de Tecnologia, projetado para facilitar o agendamento de espaços para estudos, reuniões e eventos acadêmicos.'
  },
  {
    image: imgQuadra,
    title: 'Quadra',
    description:
      'O Reservation Mauá é o sistema de reserva de salas do Instituto Mauá de Tecnologia, projetado para facilitar o agendamento de espaços para estudos, reuniões e eventos acadêmicos.'
  },
  {
    image: imgBeachTenis,
    title: 'Beach Tênis',
    description:
      'O Reservation Mauá é o sistema de reserva de salas do Instituto Mauá de Tecnologia, projetado para facilitar o agendamento de espaços para estudos, reuniões e eventos acadêmicos.'
  }
]

export function Reservations() {
  return (
    <div className="flex h-auto max-w-7xl flex-col items-center justify-center gap-12 px-6 py-44 md:gap-24 md:px-12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="font-league text-4xl font-bold text-blue-primary lg:text-5xl">
          Reserve seu espaço!
        </h1>
        <p className="hidden font-poppins text-2xl font-normal text-blue-primary lg:flex">
          O Reservation Mauá é o sistema de reserva de salas, auditórios e
          quadras do Instituto Mauá de Tecnologia, projetado para facilitar o
          agendamento de espaços para estudos, reuniões e eventos acadêmicos.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
        {reservations.map((reservation) => (
          <ReservationCard {...reservation} key={reservation.title} />
        ))}
      </div>
    </div>
  )
}
