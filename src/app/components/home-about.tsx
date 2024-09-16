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
    <div className="flex h-screen w-full flex-col items-start justify-start bg-blue-primary pt-16 md:items-center md:justify-center md:pt-24 xl:pt-0">
      <div className="flex w-full max-w-[1280px] flex-col items-center justify-center gap-6 px-0 md:flex-col-reverse md:gap-16 md:px-24 xl:flex-row-reverse">
        <div className="flex flex-none flex-col sm:w-full md:w-4/5 lg:w-3/5 xl:w-5/12">
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
        <div className="flex flex-col gap-8 px-6 text-center sm:text-center md:justify-start md:px-0 md:text-start">
          <h1 className="text-center font-league text-3xl text-white sm:text-4xl lg:text-start lg:text-5xl">
            Reservation Mauá
          </h1>
          <p className="font-poppins text-lg font-light text-white sm:text-xl md:text-justify lg:text-2xl">
            O Reservation Mauá é o sistema de reservas de salas do Instituto
            Mauá de Tecnologia, projetado para facilitar o agendamento de
            espaços para estudos, reuniões e eventos acadêmicos.
          </p>
          <div className="flex items-center justify-center lg:items-start lg:justify-start">
            <Button className="px-4 text-lg font-semibold sm:text-xl">
              Menu de Reservas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
