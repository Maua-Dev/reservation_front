import Footer from '@/app/components/footer'
import { Dev } from '@/app/components/dev'
import { About } from '../components/about'
import { Reservations } from '../components/reservations'

export function Home() {
  return (
    <main className="flex h-auto flex-col items-center justify-center">
      <About />
      <Reservations />
      <Dev />
      <Footer />
    </main>
  )
}
