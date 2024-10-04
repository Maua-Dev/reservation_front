import { Button } from '@/app/components/button'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'
import { Form } from '@/app/components/form'

export function Reserve() {
  const [open, setOpen] = useState(false)
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <Button onClick={() => setOpen(true)}>Reserve</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Form />
      </Modal>
    </main>
  )
}
