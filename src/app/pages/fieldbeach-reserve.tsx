import { Court } from '../components/court-calendary'

export function FieldBeachReserve() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 pt-24">
      <Court isField={true} />
    </main>
  )
}
