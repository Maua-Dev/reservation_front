// import { useState, useRef, useEffect } from 'react'
// import { BsThreeDots } from 'react-icons/bs'
// import { Button } from '../components/button'
// import EditModal from '../components/edit-modal'
//import NoticeModal from '../components/edit-notice-modal'

export default function Terms() {
  // const [showEdit, setShowEdit] = useState(false)
  // const [showModal, setShowModal] = useState(false)
  // const editRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (!showEdit) return
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (editRef.current && !editRef.current.contains(e.target as Node)) {
  //       setShowEdit(false)
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [showEdit])

  return (
    <div className="flex w-full flex-col items-center justify-start gap-10 p-4 pt-24 font-poppins">
      <div className="flex h-[52px] w-[720px] items-center justify-center rounded-b-xl bg-blue-primary text-center text-2xl font-bold text-white">
        <p>Termos de Uso</p>
      </div>
      <div
        // ref={editRef}
        className="relative flex w-[720px] flex-col items-end justify-end"
      >
        {/* <BsThreeDots
          className="z-20 cursor-pointer"
          onClick={() => setShowEdit((prev) => !prev)}
        />
        {showEdit && (
          <Button
            className="absolute right-0 top-4 z-10 bg-blue-primary p-2 font-poppins text-base text-white"
            onClick={() => {
              setShowEdit(false)
              setShowModal(true)
            }}
          >
            Editar
          </Button>
        )} */}
        <div className="flex w-[720px] flex-col justify-between bg-grey-tertiary/20">
          <div className="flex flex-col gap-6 p-8 text-grey-secondary">
            <h1 className="text-xl font-bold text-black">
              Política de Privacidade – Mauá Reservation
            </h1>
            <p>
              O <span className="font-bold text-black">Mauá Reservation</span>,
              sistema oficial de reservas de espaços esportivos da Universidade
              Mauá, está comprometido em proteger a sua privacidade e os seus
              dados pessoais. Este Aviso de Privacidade tem como objetivo
              esclarecer como tratamos as informações fornecidas por você ao
              utilizar nossa plataforma.
            </p>

            {/* Seção 1 */}
            <section id="sec1" className="space-y-3">
              <h2 className="font-bold text-black">
                I. Quais dados pessoais poderão ser coletados
              </h2>
              <p>Podemos tratar os seguintes dados pessoais:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="font-semibold text-black">
                    Dados cadastrais:
                  </span>{' '}
                  nome completo, matrícula (quando aplicável), e-mail
                  institucional, telefone de contato.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Dados de acesso à plataforma:
                  </span>{' '}
                  data e horário de login, registros de reservas realizadas,
                  histórico de utilização dos espaços esportivos.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Dados adicionais:
                  </span>{' '}
                  curso ou vínculo institucional (para fins de controle de uso
                  dos espaços).
                </li>
              </ul>
              <p>
                Não coletamos dados sensíveis desnecessários para o
                funcionamento do sistema.
              </p>
            </section>

            {/* Seção 2 */}
            <section id="sec2" className="space-y-3">
              <h2 className="font-bold text-black">
                II. Como coletamos seus dados pessoais
              </h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="font-semibold text-black">
                    Diretamente por você:
                  </span>{' '}
                  ao se cadastrar ou acessar o sistema com suas credenciais
                  institucionais.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Durante o uso da plataforma:
                  </span>{' '}
                  quando você efetua uma reserva, altera ou cancela
                  agendamentos.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Por integração com sistemas institucionais:
                  </span>{' '}
                  quando necessário para validar seu vínculo com a Universidade
                  Mauá.
                </li>
              </ul>
            </section>

            {/* Seção 3 */}
            <section id="sec3" className="space-y-3">
              <h2 className="font-bold text-black">
                III. Finalidades do tratamento dos dados
              </h2>
              <p>Os dados pessoais poderão ser utilizados para:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Permitir o cadastro e autenticação de usuários.</li>
                <li>Gerenciar reservas e uso dos espaços esportivos.</li>
                <li>
                  Garantir o cumprimento das regras institucionais sobre
                  utilização dos ambientes.
                </li>
                <li>
                  Fornecer comunicações importantes relacionadas às suas
                  reservas (confirmações, cancelamentos, lembretes).
                </li>
              </ul>
            </section>

            {/* Seção 4 */}
            <section id="sec4" className="space-y-3">
              <h2 className="font-bold text-black">
                IV. Compartilhamento de dados
              </h2>
              <p>Seus dados poderão ser acessados exclusivamente por:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Equipe responsável pela gestão esportiva da Mauá, para
                  acompanhamento e controle das reservas.
                </li>
                <li>
                  Setores administrativos da universidade, quando necessário
                  para cumprir regras institucionais.
                </li>
              </ul>
              <p>
                Não compartilhamos seus dados com terceiros para fins
                comerciais.
              </p>
            </section>

            {/* Seção 5 */}
            <section id="sec5" className="space-y-3">
              <h2 className="font-bold text-black">
                V. Prazo de armazenamento dos dados
              </h2>
              <p>
                Os dados serão mantidos enquanto o usuário tiver vínculo ativo
                com a Universidade Mauá ou até que deixem de ser necessários
                para as finalidades descritas, respeitando a legislação vigente.
              </p>
            </section>

            {/* Seção 6 */}
            <section id="sec6" className="space-y-3">
              <h2 className="font-bold text-black">
                VI. Seus direitos como titular de dados
              </h2>
              <p>Você tem direito a:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Confirmar se tratamos seus dados.</li>
                <li>Acessar, corrigir ou atualizar seus dados.</li>
                <li>Solicitar a exclusão dos dados, quando aplicável.</li>
                <li>Revogar consentimentos concedidos.</li>
                <li>Obter informações sobre eventual compartilhamento.</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato pelo e-mail:{' '}
                <span className="font-semibold text-black">
                  privacidade@maua.br
                </span>
                .
              </p>
            </section>

            {/* Seção 7 */}
            <section id="sec7" className="space-y-3">
              <h2 className="font-bold text-black">
                VII. Alterações desta Política
              </h2>
              <p>
                Este Aviso de Privacidade poderá ser atualizado periodicamente.
                Sempre que ocorrerem mudanças relevantes, informaremos por meio
                do próprio site.
              </p>
            </section>

            {/* Seção 8 */}
            <section id="sec8" className="space-y-3">
              <h2 className="font-bold text-black">VIII. Contato</h2>
              <p>
                Em caso de dúvidas adicionais sobre esta Política de Privacidade
                ou sobre o tratamento de dados pessoais, entre em contato com a
                equipe responsável pelo Mauá Reservation através do e-mail{' '}
                <span className="font-semibold text-black">
                  privacidade@maua.br
                </span>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      {/* {showModal && <EditModal onClose={() => setShowModal(false)} />} */}
    </div>
  )
}
