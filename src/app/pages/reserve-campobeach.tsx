import { Button } from '@/app/components/button'
import { FormCampoBeach } from '@/app/components/form-campobeach'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'

export function ReserveCampoBeach() {
  const [open, setOpen] = useState(false)
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <Button onClick={() => setOpen(true)}>Reserve</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <FormCampoBeach />
      </Modal>
    </main>
  )
}
