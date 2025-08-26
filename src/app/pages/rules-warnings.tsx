import { RulesWarningCard } from '../components/rules-warning-card'
import { CardWarnings } from '../components/warnings-card'
import { Button } from '../components/button'
import { BsThreeDots } from 'react-icons/bs'
import { useState, useRef, useEffect } from 'react'
import EditModal from '../components/edit-modal'
// import { RulesWarningCard } from

export default function RulesWarnings() {
  const [showEdit, setShowEdit] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showEdit) return
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setShowEdit(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEdit])
  return (
    <div className="bg-red-30 flex h-[100vh] w-full flex-col items-center justify-start overflow-y-hidden pt-20">
      <div className="flex h-[66px] w-1/2 items-center justify-center rounded-b-xl bg-blue-primary pt-2 text-center font-poppins text-2xl font-bold text-white">
        <p className="font-bold">AVISOS E REGRAS</p>
      </div>
      <div className="flex w-full items-center justify-evenly gap-10 overflow-scroll px-14 pt-12 text-2xl text-blue-700">
        <div className="flex h-[70vh] w-1/3 flex-col items-center">
          <div className="w-[500px] pb-5 text-center font-poppins font-bold text-blue-500">
            Avisos
          </div>
          <div ref={editRef} className="flex w-full flex-col items-end pr-10">
            <BsThreeDots
              className="z-20 cursor-pointer"
              onClick={() => setShowEdit((prev) => !prev)}
            />
            {showEdit && (
              <Button
                className="flex h-5 w-1/4 items-center justify-end bg-blue-primary font-poppins text-base text-white"
                onClick={() => {
                  setShowEdit(false)
                  setShowModal(true)
                }}
              >
                Editar
              </Button>
            )}
            {showEdit && (
              <Button
                className="flex h-5 w-1/4 items-center justify-center bg-blue-primary font-poppins text-base text-white"
                onClick={() => {
                  setShowEdit(false)
                  setShowModal(true)
                }}
              >
                Adicionar
              </Button>
            )}
          </div>
          <div className="h-[60vh] w-full overflow-scroll px-4">
            <CardWarnings
              titulo="Quadra 1"
              data="24/10 à 26/10"
              conteudo="A quadra estará fechada por causa do evento Eureka bla bla bla bla bla bla bla lba lbbla bla bla bla bla bla bla lba lbbla bla bla bla bla bla bla lba lbbla bla bla bla bla bla bla lba lbbla bla bla bla bla bla bla lba lbbla bla bla bla bla bla bla lba lba bla bla lbabla lbablal bablabl "
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

        <div className="flex h-[70vh] w-2/3 flex-col items-start">
          <div>
            <p className="pb-5 font-poppins font-bold text-blue-500">Regras</p>
          </div>
          <div className="flex w-full flex-col items-end pr-8">
            <BsThreeDots
              className="z-20 cursor-pointer"
              onClick={() => setShowEdit((prev) => !prev)}
            />
            {showEdit && (
              <Button
                className="flex h-5 w-1/12 items-center justify-center bg-blue-primary p-3 font-poppins text-base text-white"
                onClick={() => {
                  setShowEdit(false)
                  setShowModal(true)
                }}
              >
                Editar
              </Button>
            )}
          </div>
          <div className="flex h-[60vh] w-full flex-col justify-between">
            <RulesWarningCard content=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " />
          </div>
          {showModal && <EditModal onClose={() => setShowModal(false)} />}
        </div>
      </div>
    </div>
  )
}
