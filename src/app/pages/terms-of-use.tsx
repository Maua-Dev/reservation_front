import { useState, useRef, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Button } from '../components/button'
import EditModal from '../components/edit-modal'
import NoticeModal from '../components/edit-notice-modal'

export default function Terms() {
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
    <div className="flex w-full flex-col items-center justify-start gap-10 p-4 pt-24 font-poppins">
      <div className="flex h-[52px] w-[720px] items-center justify-center rounded-b-xl bg-blue-primary text-center text-2xl font-bold text-white">
        <p>Termos de Uso</p>
      </div>
      <div
        ref={editRef}
        className="relative flex w-[720px] flex-col items-end justify-end"
      >
        <BsThreeDots
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
        )}
        <div className="flex w-[720px] flex-col justify-between bg-gray-200">
          <div className="flex flex-col gap-2 p-8">
            What is Lorem Ipsum? <p></p> Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industrys standard dummy text ever since the 1500s, when an
            <p></p>
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting,
            <p></p>
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing
            <p></p>
            Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including
            <p></p>
            versions of Lorem Ipsum.
            <p></p>
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing
            <p></p>
            Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including
            <p></p>
            versions of Lorem Ipsum.
          </div>
        </div>
      </div>
      {showModal && <NoticeModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
