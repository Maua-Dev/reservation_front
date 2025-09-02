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
          <div className="flex flex-col gap-2 p-8 font-semibold text-grey-secondary">
            <p>
              Bem-vindo ao nosso serviço! Ao utilizar esta aplicação, você
              concorda com os seguintes termos de uso:
            </p>
            <p>
              1. O uso deste serviço é destinado apenas para fins legais e
              autorizados. Você concorda em não utilizar o serviço para
              atividades ilícitas.
            </p>
            <p>
              2. Reservamo-nos o direito de modificar ou encerrar o serviço a
              qualquer momento, sem aviso prévio.
            </p>
            <p>
              3. Suas informações pessoais serão tratadas conforme nossa
              política de privacidade.
            </p>
            <p>
              4. Não nos responsabilizamos por danos diretos ou indiretos
              decorrentes do uso deste serviço.
            </p>
            <p>
              5. O conteúdo disponibilizado é protegido por direitos autorais e
              não pode ser reproduzido sem autorização.
            </p>
            <p>
              Ao continuar utilizando o serviço, você declara que leu e concorda
              com estes termos.
            </p>
          </div>
        </div>
      </div>
      {/* {showModal && <EditModal onClose={() => setShowModal(false)} />} */}
    </div>
  )
}
