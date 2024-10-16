import { Button } from '@/app/components/button'
import imageDev1 from '@/app/assets/image-1.svg'
import imageDev2 from '@/app/assets/image-2.svg'
import imageDev3 from '@/app/assets/image-3.svg'
import { Carousel } from '@/app/components/carrossel'

export function Dev() {
  const slides = [imageDev1, imageDev2, imageDev3]

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-primary px-4 py-12 md:gap-16 md:py-0 lg:px-14">
      <h1 className="font-league text-3xl font-semibold text-white md:text-5xl">
        Dev Community Mauá
      </h1>

      <div className="flex w-full flex-col items-center justify-center gap-8 px-8 md:flex-row md:items-start">
        <div className="text-md order-2 flex w-full flex-col items-center text-justify font-poppins text-white md:order-1 md:w-1/2 md:items-start md:text-xl">
          <p className="">
            O Dev. Community Mauá, fundado em 2021, é uma extracurricular do
            Instituto Mauá de Tecnologia e tem por objetivo o desenvolvimento e
            criação de soluções computacionais.
          </p>
          <p className="pb-8 md:pb-12">
            Voltado aos alunos que gostam de desafios e buscando sempre trazer
            um contato mais eficaz com a áreas de computação, estamos aqui para
            incorporar, principalmente, o trabalho em equipe e as práticas do
            mercado com o mundo da tecnologia e inovação.
          </p>
          <Button
            onClick={() => window.open('https://devmaua.com', '_blank')}
            className="text-md sm:w-2/4 md:w-3/4 md:text-xl"
          >
            Acesse nosso portfolio aqui!
          </Button>
        </div>
        <div className="order-1 flex w-full justify-center md:order-2 md:w-1/2">
          <Carousel>
            {slides.map((s) => (
              <img key={s} src={s} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
