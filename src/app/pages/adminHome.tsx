/* eslint-disable prettier/prettier */
import { AdminOption } from "../components/adminOption";
import imgBeachTenis from "../assets/imagem-beachtenis.png";
import imgCampo from "../assets/imagem-campo.png";
import imgQuadra from "../assets/imagem-quadra.png";
import { Dev } from "../components/dev";
import Footer from "../components/footer";

const options = [
  {
    image: imgCampo,
    title: "Manutenção e Eventos",
    action: "Eventos",
    calendar: "/fieldbeach-reserve",
  },
  {
    image: imgQuadra,
    title: "Reservas e Relatórios",
    action: "Visualizar",
    calendar: "/court-reserve",
  },
  {
    image: imgBeachTenis,
    title: "Professores Autorizados",
    action: "Visualizar",
    calendar: "/fieldbeach-reserve",
  },
];

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
      <div className="flex w-full flex-col items-center justify-center gap-20 pb-40 bg-gray-50 p-4">
        {options.map((option) => (
          <AdminOption
            key={option.title}
            title={option.title}
            image={option.image}
            action={option.action}
            directory={option.calendar}
          />
        ))}
      </div>
      <Dev />
      <Footer />
    </main>
  );
}
