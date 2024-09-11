import { useState, useCallback } from 'react'
import { Button } from './button'
import { Carousel } from '../components/carrossel'
import { MdCircle } from 'react-icons/md'
import maua1 from '../assets/maua1.png'
import maua2 from '../assets/maua2.png'
import maua3 from '../assets/maua3.png'
import maua4 from '../assets/maua4.png'

export function About() {
  const slides = [maua1, maua2, maua3, maua4]
  const [currSlide, setCurrSlide] = useState(0)

  const handleSlideChange = useCallback((index: number) => {
    setCurrSlide(index)
  }, [])

  return (
    <div className="mx-auto flex h-screen w-full max-w-6xl flex-col items-start justify-start bg-blue-primary md:p-4">
      <div className="flex w-full max-w-[1280px] flex-col items-center justify-between md:flex-row-reverse md:py-12 lg:py-0">
        <div className="mt-16 flex-none sm:mt-16 sm:w-full sm:py-2 md:mt-32 md:w-2/5 md:px-2 md:py-2 lg:mr-12 lg:mt-36 lg:w-5/12">
          <div className="pointer-events-auto relative">
            <Carousel onSlideChange={handleSlideChange}>
              {slides.map((s) => (
                <img key={s} src={s} className="object-cover" alt="slide" />
              ))}
            </Carousel>
          </div>
          <div className="mt-4 flex justify-center">
            {slides.map((_, index) => (
              <MdCircle
                key={index}
                className={`w-8 transition-all ${currSlide === index ? 'w-10 text-white' : 'w-6 text-white/50'} hidden md:flex`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col text-center sm:text-center md:justify-start md:text-start lg:items-start lg:text-start">
          <h1 className="hidden px-6 font-league font-normal text-white md:mt-40 md:flex md:text-4xl lg:mt-56 lg:text-5xl">
            Reservation Mauá
          </h1>
          <p className="mt-4 px-5 font-poppins text-xl font-light text-white sm:px-12 sm:text-2xl md:mr-12 md:px-6 md:text-justify md:text-xl lg:mr-28 lg:mt-8 lg:text-2xl">
            O Reservation Mauá é o sistema de reservas de salas do Instituto
            Mauá de Tecnologia, projetado para facilitar o agendamento de
            espaços para estudos, reuniões e eventos acadêmicos.
          </p>
          <div className="mt-4 flex items-center justify-center sm:mt-8 sm:items-center sm:justify-center md:mt-2 md:items-start md:justify-start md:px-6 lg:mt-8">
            <Button className="w-60 text-xl font-semibold sm:w-52 sm:p-2 sm:text-xl md:mt-8 md:w-48 md:p-2 md:text-xl lg:w-52 lg:px-0 lg:text-xl">
              Menu de Reservas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
