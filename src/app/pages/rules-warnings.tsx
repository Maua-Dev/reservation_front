import { RulesWarningCard } from '../components/rules-warning-card'
import { CardWarnings } from '../components/warnings-card'
// import { RulesWarningCard } from

{
  titulo: 'Todas'
  data: '24/10 à 26/10'
  conteudo: 'A quadra bla bla bla bla Eureka'
}

export default function RulesWarnings() {
  return (
    <div className="bg-red-30 flex h-[100vh] w-full flex-col items-center justify-start pt-20">
      {/* <p className="text-4xl">Rules and warnings here</p> */}
      {/* <div className="flex h-[80px] w-[900px] items-center justify-center rounded-b-lg bg-blue-primary text-center text-4xl text-white">
        <p>Avisos e Regras</p>
      </div> */}
      <div className="flex h-[66px] w-[900px] items-center justify-center rounded-md bg-blue-400 pt-[0px] text-center text-3xl text-white">
        <p className="font-bold">AVISOS E REGRAS</p>
      </div>
      <div className="flex h-[10px] w-full items-start justify-between px-[20rem] pl-20 pt-12 text-2xl text-blue-700">
        <div>
          <div className="w-[500px] pb-5 text-center font-poppins font-bold text-blue-500">
            Avisos
          </div>
          <div className="h-[350px] w-[600px] overflow-auto">
            <CardWarnings
              titulo="Quadra 1"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka bla bla bla bla bla bla bla lba lba bla bla lbabla lbablal bablabl "
            ></CardWarnings>
            <CardWarnings
              titulo="Todas"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka"
            ></CardWarnings>
            <CardWarnings
              titulo="Todas"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka"
            ></CardWarnings>
            <CardWarnings
              titulo="Todas"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka"
            ></CardWarnings>
            <CardWarnings
              titulo="Todas"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka"
            ></CardWarnings>
            <CardWarnings
              titulo="Todas"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka"
            ></CardWarnings>
          </div>
        </div>

        <div>
          <p className="font-poppins font-bold text-blue-500">Regras</p>
        </div>
      </div>
      <div className="flex h-[0px] w-[1150px] flex-col items-end justify-between pl-24 pt-14">
        <div>
          <RulesWarningCard content=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " />
        </div>
      </div>
    </div>
  )
}
