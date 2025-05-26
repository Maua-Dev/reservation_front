import { Court } from '../components/court-calendary'
import Footer from '../components/footer'

export function CourtReserve() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white pt-20">
      <Court isField={false} />
      <Footer />
    </main>
  )
}
