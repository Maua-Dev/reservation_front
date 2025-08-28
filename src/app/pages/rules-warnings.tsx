import { RulesWarningCard } from '../components/rules-warning-card'
import { CardWarnings } from '../components/warnings-card'
import { Button } from '../components/button'
import { useState, useRef, useEffect, useContext } from 'react'
import EditModal from '../components/edit-modal'
import NoticeModal from '../components/edit-notice-modal'
import { alertContext } from '../contexts/alerts-context'
// import { RulesWarningCard } from

export default function RulesWarnings() {
  const [showEdit, setShowEdit] = useState(false)
  // const [showModal, setShowModal] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
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
    <div className="bg-red-30 flex h-[100vh] w-full flex-col items-center justify-start overflow-y-hidden pt-20">
      <div className="flex h-[66px] w-1/2 items-center justify-center rounded-b-xl bg-blue-primary pt-2 text-center font-poppins text-2xl font-bold text-white">
        <p className="font-bold">AVISOS E REGRAS</p>
      </div>
      <div className="flex w-full items-center justify-evenly gap-10 overflow-scroll px-14 pt-12 text-2xl text-blue-700">
        <div className="flex h-[72vh] w-1/3 flex-col items-center justify-center">
          <div className="w-[100px] pb-0 text-center font-poppins font-bold text-blue-500">
            Avisos
          </div>
          <div
            ref={editRef}
            className="flex w-full flex-row justify-end pb-4 pr-8"
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
          <div className="h-[60vh] w-full overflow-scroll px-4">
            <div>
              {alerts &&
                alerts.map((alert) => (
                  <CardWarnings alert={alert} key={alert.alert.alert_id} />
                ))}
            </div>
          </div>
        </div>

        <div className="flex h-[70vh] w-2/3 flex-col items-start">
          <div>
            <p className="font-poppins font-bold text-blue-500">Regras</p>
          </div>
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
          <div className="flex h-[60vh] w-full flex-col justify-between">
            <RulesWarningCard content=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " />
          </div>
          {showEditModal && (
            <EditModal onClose={() => setShowEditModal(false)} />
          )}
        </div>
      </div>
    </div>
  )
}
