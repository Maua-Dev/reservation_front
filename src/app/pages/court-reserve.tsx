import { Modal } from "@/app/components/modal"
import { useState } from "react"
import { Button } from "@/app/components/button"
import { ReservationDetails } from "../components/reservation-details"
import { Court } from "../components/court-calendary"

export function CourtReserve() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const modalities = ["Basquete", "Handbol", "Futsal", "Vôlei", "Tênis"]
  const equipments = [
    "Bola de futsal",
    "Bola de handol",
    "Bola de tênis",
    "Bola de vôlei",
    "Raquete de tênis"
  ]
  const options = ["Quadra 1", "Quadra 2", "Quadra 3"]
  const isChecked = [true, false]

  const closeModal = () => setOpenModal(null)

  return (
    <main className='flex min-h-screen items-center justify-center gap-6 bg-gray-50 pt-24'>
      <Court />
    </main>
  )
}
