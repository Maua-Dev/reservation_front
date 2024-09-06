import { Button } from '@/app/components/button'
import Carousel from '@/app/components/carousel'

export function HomeDev() {
  const slides = [
    'https://s3-alpha-sig.figma.com/img/f5b0/08ad/e722be717a10260acfe38c11437d6f60?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VodEb~kZug6myIj-uY3HDyCSk3A9mFvqRV8clIljRrkMLRZBN98QYJ7PYxKoZsdA9-K~-auHsUdjeh-9VWjlB0mi9mpcPEzsiP7hWqD1vlWTWISrN~903PaiqG5gyQ46f8Z3fgERKzFjxshzio9oGS5SZgUZU35Ps9XBU2QfJcpA0ykHwbMPtZ6ltVBJaOFjHMe3FRC~GfikjzhBMzp~~XWgRO8BqVFpE7Vq4K4obOft0uJK3fBq4u3WIIquQNydfUHbj~OXbtRU7j-pE--U52dZOd1W3gIMx4dJ85gEAg6MyiTwgzwbXl~UaZkNyol9Qr3kuw0e4fJwpm2hUhWPCg__',
    'https://s3-alpha-sig.figma.com/img/14da/ffee/22783026fda0150a0ccc9af578814ff5?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TmXt3lHmDzr4e4RB1lxlUDqTDdk-4BxpE9MhlJH8icyjZohh~54rdeuuSJnFDeHQTV~lbKeOEyqszJ1m0P9-o79rb6Cye~ReOtc22C3QdmmvRC-~5Zl4Rz4m58~ejyfBPefQXhyVRfElUyZx-plJiVTsF4imRQaqzOYEJPphvjNarLLJMbyJmwSSQDJSNhGZ~FjAK3WN5whQnuzP-Bf84aB1r-wpkbPok4h9dz9Bz2NaTCMnB8KZQPqr8-7OHqRk3QnzQSz6puyEqsAuZiCYxSCj6Z3bp~Mt6FudoFQpvB33yH~yUIuPdi37flddiq4EsMYQkDNvyfj7ZnYHWJvX2g__',
    'https://s3-alpha-sig.figma.com/img/4ee7/d195/a4278338a326759c9a10d62d0760a0b2?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F~rZUha-Hp1-rtnx4ffasIFdVq5uDSrNSwfaiJ-O-pZmIUb5yO06Fqom3i4-NRpdjcUCkbVlq3PJIOaeu13zVjXttV~3IZgtnh808D0jdvGHBl~OQnr6Agx~QIQZa~SFoY7fxRUxWJoohEDXR1Cb6zj1H-TLOkgFCKoKJTUPUcaM6gXj0dNHN5UITFDsLn6F0XwOSoqWUf53Ej~8wbXyW2VhSo0c7Cd5HNHD7tDqobU5ZrRjT3yfmjIRAOb9RAGEyA-he7l7WjoZ-tJmlEIcCfd97qanVy8-Tu6W5s3xTCY761QSdn8kCyp9r44EIIDSmwQ8QxlzfU4~GfQRfCF9vA__',
    'https://s3-alpha-sig.figma.com/img/e799/0061/f827f9bb87eff13035b8e733214febec?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c8AScVI~2dzcTNd1a552nn68TWYAS-W68Ih9icuZx6WEmAFPMKvZQhgnYRZs4Y5nNudVYwEtNWSQvdOwyph5kVnl2ZLfj0nb~7ELDV75nf5U0fTFIdV9FlMblDVo2y73TWhW~t~nutnRIfb4NwH2m1ry8-C8mFuDCJZNCOPq06ys2uwBq3pq0Ta8eIDMV0jFnh05zIhyU3qSkEcxWXxYglsEwmjiriIwbOxBnHKb7D8TbUqA9IgonB7M8gA-~xX-r3E53HIOldDh65SyXTorupBVUof-xoAEVROP6P6~5OSVkbD5JHYpGtsrk2BRVq2QOPXk6nrWomiXHmbjbijB4w__'
  ]

  return (
    <>
      <h1 className="pb-32 text-4xl font-bold text-white">
        Dev Community Mauá
      </h1>

      <div className="flex w-full flex-col items-center justify-center gap-4 px-8 md:flex-row md:items-start">
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
          <Button className="text-md sm:w-2/4 md:w-3/4 md:text-xl">
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
    </>
  )
}
