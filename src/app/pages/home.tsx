import Footer from '@/app/components/footer'
import { HomeDev } from '@/app/components/home-dev'
import { About } from '../components/home-about'

export function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-green-100">
      <About/>
      <section className="flex w-full flex-grow flex-col items-center justify-center bg-blue-primary pb-4">
        <HomeDev />
      </section>
      <Footer />
    </main>
  )
}
