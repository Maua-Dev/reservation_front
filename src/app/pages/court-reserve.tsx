import { Court } from '../components/court-calendary'

export function CourtReserve() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-6 bg-gray-50 pt-24">
      <Court isField={false} />
    </main>
  )
}
