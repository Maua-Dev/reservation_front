import { Button } from '@/app/components/button'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'
import { Form } from '../components/form'

export function FieldBeachReserve() {
  const [open, setOpen] = useState(false)
  const modalities = ['Futebol de Campo', 'Rugby']
  const equipments = ['Bola de Futebol', 'Bola de Rugby']
  const options = ['Campo', 'Beach Tennis']
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
