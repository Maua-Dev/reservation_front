import { IoClose } from 'react-icons/io5'
import { Button } from './button'
import { toast } from 'react-toastify'

export default function EditModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div
        className="relative flex w-[640px] flex-col items-end bg-white p-10 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-black">
          <IoClose className="text-2xl" />
        </button>
        <div className="flex h-[320px] w-full flex-col gap-2 overflow-auto rounded-lg border border-gray-300 bg-gray-50 p-4 text-black">
          What is Lorem Ipsum? <p></p> Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industrys
          standard dummy text ever since the 1500s, when an
          <p></p>
          unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting,
          <p></p>
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing
          <p></p>
          Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including
          <p></p>
          versions of Lorem Ipsum.
          <p></p>
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing
          <p></p>
          Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including
          <p></p>
          versions of Lorem Ipsum.
        </div>
        <Button
          className="mt-4 bg-blue-primary px-16 py-2 text-base text-white"
          onClick={() => {
            toast.success('Atualização salva com sucesso!')
            onClose()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
