import { Button } from '@/app/components/button'
import Carousel from '@/app/components/carousel'

const slides = [
  'https://s3-alpha-sig.figma.com/img/f5b0/08ad/e722be717a10260acfe38c11437d6f60?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VodEb~kZug6myIj-uY3HDyCSk3A9mFvqRV8clIljRrkMLRZBN98QYJ7PYxKoZsdA9-K~-auHsUdjeh-9VWjlB0mi9mpcPEzsiP7hWqD1vlWTWISrN~903PaiqG5gyQ46f8Z3fgERKzFjxshzio9oGS5SZgUZU35Ps9XBU2QfJcpA0ykHwbMPtZ6ltVBJaOFjHMe3FRC~GfikjzhBMzp~~XWgRO8BqVFpE7Vq4K4obOft0uJK3fBq4u3WIIquQNydfUHbj~OXbtRU7j-pE--U52dZOd1W3gIMx4dJ85gEAg6MyiTwgzwbXl~UaZkNyol9Qr3kuw0e4fJwpm2hUhWPCg__'
]

export function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center bg-blue-primary py-20">
        <h1 className="pb-32 text-4xl font-bold text-white">
          Dev Community Mauá
        </h1>

        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:items-start">
          <div className="text-md order-2 flex flex-col items-center text-justify font-poppins text-white md:order-1 md:items-start md:text-xl">
            <p className="">
              O Dev. Community Mauá, fundado em 2021, é uma extracurricular do
              Instituto Mauá de Tecnologia e tem por objetivo o desenvolvimento
              e criação de soluções computacionais.
            </p>
            <p className="pb-8 md:pb-12">
              Voltado aos alunos que gostam de desafios e buscando sempre trazer
              um contato mais eficaz com a áreas de computação, estamos aqui
              para incorporar, principalmente, o trabalho em equipe e as
              práticas do mercado com o mundo da tecnologia e inovação.
            </p>
            <Button className="text-md sm:w-2/4 md:w-3/4 md:text-xl">
              Acesse nosso portfolio aqui!
            </Button>
          </div>
          <div className="order-1 max-w-max md:order-2">
            <Carousel>
              {slides.map((s) => (
                <img
                  key={s}
                  src={s}
                  className="h-auto w-full max-w-md rounded-md border-2 border-white md:max-w-max"
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </main>
  )
}
