import { Button } from '@/app/components/button'
import { Form } from '@/app/components/form'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'

export function CourtReserve() {
  const [open, setOpen] = useState(false)
  const modalities = ['Basquete', 'Handbol', 'Futsal', 'Vôlei', 'Tênis']
  const equipments = [
    'Bola de futsal',
    'Bola de handol',
    'Bola de tênis',
    'Bola de vôlei',
    'Raquete de tênis'
  ]
  const options = ['Quadra 1', 'Quadra 2', 'Quadra 3']
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <Button onClick={() => setOpen(true)}>Reserve</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Form
          modalities={modalities}
          equipments={equipments}
          options={options}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </main>
  )
}
