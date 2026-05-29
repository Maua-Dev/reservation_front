import { useMsal } from '@azure/msal-react'
import imgCampo from '../assets/imagem-campo.png'
import imgQuadra from '../assets/imagem-quadra.png'
// import imgAtividadeLivres from '../assets/imagem-beachtenis.png'
import { loginRequest } from '../auth/auth-config'
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
      'Ambiente coberto, pertencente ao CEAF, onde usuários podem praticar esportes e realizar campeonatos',
    calendar: '/court-reserve'
  }
  // {
  //   image: imgAtividadeLivres,
  //   title: 'Atividades Livres',
  //   description:
  //     'Ambientes abertos, pertencentes ao CEAF, onde usuários podem praticar esportes',
  //   calendar: '/activity'
  // }
]

export function Reservations() {
  const { instance } = useMsal()
  const fetchAccessToken = async () => {
    const accounts = instance.getAllAccounts()
    const accessToken = (
      await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
    ).accessToken
    localStorage.setItem('accessToken', accessToken)
    return accessToken
  }
  fetchAccessToken()
  return (
    <section id="reservation" className="scroll-smooth">
      <div className="flex h-auto min-h-screen max-w-7xl flex-col items-center justify-center gap-10 py-10 md:gap-24 md:px-8">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-league text-3xl font-semibold text-blue-primary lg:text-5xl">
            Reserve seu espaço!
          </h1>
          <p className="hidden font-poppins text-2xl font-normal text-blue-primary lg:flex lg:flex-col">
            Sinta-se a vontade para usufruir dos espaços ideais para realizar
            suas atividades! <span></span> Selecione abaixo o local desejado
            para realizar a sua reserva:
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6 p-4 px-2 md:flex-row">
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
