/* eslint-disable prettier/prettier */
import { AdminOption } from '@/app/components/adminOption'
import Footer from '@/app/components/footer'
import imgBeachTenis from '../../assets/imagem-beachtenis.png'
import imgCampo from '../../assets/imagem-campo.png'
// import imgQuadra from '../../assets/imagem-quadra.png'

const options = [
  {
    image: imgCampo,
    title: 'Agendar Manutenção ou Evento',
    action: 'Eventos',
    dir: '/admin-reserve'
  },
  // {
  //   image: imgQuadra,
  //   title: 'Visualizar Reservas de Usuários',
  //   action: 'Visualizar',
  //   dir: '/admin-report'
  // },
  {
    image: imgBeachTenis,
    title: 'Professores Autorizados',
    action: 'Visualizar',
    dir: '/fieldbeach-reserve'
  }
]

export default function AdminHome() {
  return (
    <main className="flex h-auto flex-col items-center justify-center">
      <div className="flex h-[80vh] w-full flex-col items-center justify-center bg-gray-50">
        <h1 className="font-league text-[50px] font-bold text-blue-primary">
          Olá Administrador!
        </h1>
        <p className="mt-4 w-3/4 text-center font-poppins text-2xl text-blue-primary">
          O Reservation Mauá é o sistema de reserva de salas, auditórios e
          quadras do Instituto Mauá de Tecnologia, projetado para facilitar o
          agendamento de espaços para estudos, reuniões e eventos acadêmicos.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-20 bg-gray-50 p-4 pb-40">
        {options.map((option) => (
          <AdminOption
            key={option.title}
            title={option.title}
            image={option.image}
            action={option.action}
            directory={option.dir}
          />
        ))}
      </div>
      <Footer />
    </main>
  )
}
