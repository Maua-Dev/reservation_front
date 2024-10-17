import { Button } from '@/app/components/button'
import { FormQuadra } from '@/app/components/form-quadra'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'

export function ReserveQuadra() {
  const [open, setOpen] = useState(false)
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <Button onClick={() => setOpen(true)}>Reserve</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <FormQuadra />
      </Modal>
    </main>
  )
}
