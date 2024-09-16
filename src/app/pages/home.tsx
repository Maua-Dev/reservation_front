import Footer from '@/app/components/footer'
import { Dev } from '@/app/components/dev'
import { About } from '../components/about'

export function Home() {
  return (
    <main className="flex h-auto flex-col items-center justify-center">
      {/* <section className="w-full bg-blue-primary pb-16 xl:py-0"> */}
      <About />
      {/* </section> */}

      {/* <section className="flex w-full flex-grow flex-col items-center justify-center bg-blue-primary pb-8"> */}
      <Dev />
      {/* </section> */}
      <Footer />
    </main>
  )
}
