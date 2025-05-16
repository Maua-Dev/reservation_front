import imgCampo from '../assets/imagem-campo.png'
import imgQuadra from '../assets/imagem-quadra.png'
import { ReservationCard } from './reservation-card'

const reservations = [
  {
    image: imgCampo,
    title: 'Campo',
    description:
      'Ambiente aberto, pertencente ao CEAF, onde usuários podem praticar esportes e realizar projetos acadêmicos',
    calendar: '/fieldbeach-reserve'
  },
  {
    image: imgQuadra,
    title: 'Quadra',
    description:
      'Ambiente poliesportivo coberto, pertencente ao CEAF, onde usuários podem praticar esportes e realizar campeonatos',
    calendar: '/court-reserve'
  }
]

export function Reservations() {
  return (
    <section id="reservation" className="scroll-smooth">
      <div className="flex h-auto min-h-screen max-w-7xl flex-col items-center justify-center gap-10 px-6 py-24 md:gap-24 md:px-12">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-league text-4xl font-semibold text-blue-primary lg:text-5xl">
            Reserve seu espaço!
          </h1>
          <p className="hidden font-poppins text-2xl font-normal text-blue-primary lg:flex lg:flex-col">
            Sinta-se a vontade para usufruir dos espaços ideais para realizar
            suas atividades! <span></span> Selecione abaixo o local desejado
            para realizar a sua reserva:
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
          {reservations.map((reservation) => (
            <ReservationCard
              {...reservation}
              key={reservation.title}
              calendar={reservation.calendar}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
