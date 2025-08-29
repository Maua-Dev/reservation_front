import { RulesWarningCard } from '../components/rules-warning-card'
import { CardWarnings } from '../components/warnings-card'
import { Button } from '../components/button'
import { useState, useRef, useEffect, useContext } from 'react'
import EditModal from '../components/edit-modal'
import NoticeModal from '../components/edit-notice-modal'
import { alertContext } from '../contexts/alerts-context'
import { useUser } from '../hooks/use-user'
import DeleteAlertModal from '../components/admin/delteAlertModal'
// import { RulesWarningCard } from

export default function RulesWarnings() {
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const { user } = useUser()
  const { alerts } = useContext(alertContext)
  console.log('alerts: ', alerts)

  useEffect(() => {
    if (!showEdit && !showNoticeModal && !showEditModal) return

    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setShowEdit(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEdit, showEditModal, showNoticeModal])

  return (
    <div className="bg-red-30 flex h-[100vh] w-full flex-col items-center justify-start overflow-hidden bg-white px-14 pt-20">
      {showDeleteModal && selectedAlert && (
        <DeleteAlertModal
          onClose={() => setShowDeleteModal(false)}
          alertId={selectedAlert}
        />
      )}
      <div className="flex h-[66px] w-1/2 items-center justify-center rounded-b-xl bg-blue-primary pt-2 text-center font-poppins text-2xl font-bold text-white">
        <p className="font-bold">AVISOS E REGRAS</p>
      </div>
      <div className="flex w-full items-center justify-evenly gap-10 overflow-hidden pt-12 text-2xl text-blue-700">
        <div className="flex h-[72vh] w-1/3 flex-col items-center justify-center">
          <div className="flex w-[100px] flex-row gap-16 pb-5 text-center font-poppins font-bold text-blue-500">
            Avisos
            {user?.role === 'ADMIN' && (
              <div
                ref={editRef}
                className="mt-2 flex w-full flex-row justify-end pb-2 pr-8"
              >
                <Button
                  className="flex h-5 w-1/12 items-center justify-center bg-blue-primary font-poppins text-base text-white"
                  onClick={() => {
                    setShowEdit(false)
                    setShowNoticeModal(true)
                  }}
                >
                  +
                </Button>
                {showNoticeModal && (
                  <NoticeModal onClose={() => setShowNoticeModal(false)} />
                )}
              </div>
            )}
          </div>

          <div className="h-[60vh] w-full overflow-x-hidden overflow-y-scroll px-4">
            <div>
              {alerts &&
                alerts.map((alert) => (
                  <CardWarnings
                    alert={alert}
                    key={alert.alert.alert_id}
                    confirmDelete={() => {
                      setShowDeleteModal(true)
                      setSelectedAlert(alert.alert.alert_id)
                    }}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="flex h-[70vh] w-2/3 flex-col items-start">
          <div>
            <p className="font-poppins font-bold text-blue-500">Regras</p>
          </div>
          {user?.role === 'ADMIN' && (
            <div className="flex w-full flex-col items-end pb-3 pr-8">
              <Button
                className="flex h-5 w-1/12 items-center justify-center bg-blue-primary p-3 font-poppins text-base text-white"
                onClick={() => {
                  setShowEdit(false)
                  setShowEditModal(true)
                }}
              >
                Editar
              </Button>
              {showEditModal && (
                <EditModal onClose={() => setShowEditModal(false)} />
              )}
            </div>
          )}

          <RulesWarningCard
            content={`Não é permitido fumar nas dependências do condomínio, incluindo áreas comuns e privativas, conforme legislação vigente.\n
      O uso das áreas comuns deve ser feito com respeito aos horários estabelecidos pelo regulamento interno evitando barulhos excessivos após as 22h.\n
      É proibido realizar festas ou eventos sem a devida autorização da administração do condomínio.
      Animais de estimação são permitidos, desde que não causem incômodo aos demais moradores e estejam sempre acompanhados em áreas comuns.\n
      O descarte de lixo deve ser feito de forma seletiva, utilizando os recipientes apropriados localizados nas áreas designadas.\n
      Não é permitido modificar a fachada do prédio ou instalar objetos nas janelas e sacadas sem aprovação prévia.\n
      Visitantes devem ser identificados na portaria e acompanhados pelo morador responsável durante toda a permanência.\n
      O uso das vagas de garagem é exclusivo para veículos cadastrados e não deve ser cedido a terceiros sem autorização.\n
      Qualquer dano causado ao patrimônio comum deverá ser comunicado imediatamente à administração e ressarcido pelo responsável.\n
      O descumprimento das regras poderá resultar em advertências, multas ou outras sanções previstas no regimento interno.`}
          />
          {showEditModal && (
            <EditModal onClose={() => setShowEditModal(false)} />
          )}
        </div>
      </div>
    </div>
  )
}
