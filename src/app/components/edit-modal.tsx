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
          <section>
            <h2>Regras das Quadras</h2>
            <ul>
              <li>
                Não é permitido entrar com alimentos ou bebidas de qualquer
                espécie nas quadras.
              </li>
              <li>Não cuspir no piso.</li>
              <li>
                Não fumar nas quadras ou nas dependências do ginásio (incluindo
                vestiários).
              </li>
              <li>Não jogar descalço, de chinelo ou sapato.</li>
              <li>
                Não é permitido jogar com brincos, relógios, anéis, pulseiras,
                bonés, óculos ou qualquer objeto que possa ferir outros colegas.
              </li>
              <li>Evitar palavrões.</li>
              <li>
                Fazer reserva antecipada das quadras na secretaria do CCA.
              </li>
              <li>
                Os coletes deverão ser devolvidos obrigatoriamente após o
                término da aula (entregá-los na bancada da monitora Renata).
              </li>
              <li>
                Utilizar roupa adequada para a prática esportiva: camiseta,
                shorts ou calça legging, meias e tênis. Não é permitido
                participar de bermudas, saias, vestidos, jeans ou chinelos.
              </li>
              <li>Limpar os pés antes de entrar nas quadras.</li>
            </ul>
          </section>
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
