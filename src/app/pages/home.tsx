import { Button } from '@/app/components/button'
import Carousel from '@/app/components/carousel'
import Footer from '@/app/components/footer'
import { HomeDev } from '@/app/components/home-dev'

export function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="flex w-full flex-grow flex-col items-center justify-center bg-blue-primary pb-4">
        <HomeDev />
      </section>
      <Footer />
    </main>
  )
}
