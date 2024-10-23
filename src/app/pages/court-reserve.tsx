import { Button } from '@/app/components/button'
import { CourtForm } from '@/app/components/court-form'
import { Modal } from '@/app/components/modal'
import { useState } from 'react'

export function CourtReserve() {
  const [open, setOpen] = useState(false)
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <Button onClick={() => setOpen(true)}>Reserve</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <CourtForm />
      </Modal>
    </main>
  )
}
