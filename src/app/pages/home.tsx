import { Button } from '@/app/components/button'
import Carousel from '@/app/components/carousel'
import { HomeDev } from '@/app/components/home-dev'

export function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center bg-blue-primary py-20">
        <HomeDev />
      </section>
    </main>
  )
}
