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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-blue-primary md:p-4">
      <div className="flex w-full flex-col items-center justify-between md:flex-row-reverse">
        <div className="mt-[4.5rem] flex-none sm:mt-[4.7rem] sm:w-full sm:py-2 md:mt-32 md:w-[46%] md:px-2 md:py-2 lg:mr-12 lg:mt-36 lg:w-[40%]">
          <div className="pointer-events-auto relative">
            <Carousel onSlideChange={handleSlideChange}>
              {slides.map((s) => (
                <img
                  key={s}
                  src={s}
                  className="h-[280px] w-[800px] object-cover sm:h-[312px] sm:w-[800px] md:h-[270px]"
                  alt="slide"
                />
              ))}
            </Carousel>
          </div>
          <div className="mt-4 flex justify-center">
            {slides.map((_, index) => (
              <MdCircle
                key={index}
                className={`w-8 ${currSlide === index ? 'text-white' : 'text-white/50'} hidden md:flex`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:p-0 md:mr-0 lg:mr-0 lg:items-start">
          <h1 className="hidden px-6 font-league font-normal text-white md:mt-24 md:flex md:text-3xl lg:mt-36 lg:text-4xl">
            Reservation Mauá
          </h1>
          <p className="mt-4 px-5 text-center font-poppins text-[0.9rem] font-light text-white sm:mt-[-1.8rem] sm:px-5 sm:py-4 sm:text-center sm:text-[0.9rem] md:mt-2 md:justify-start md:px-6 md:py-4 md:text-start md:text-[1rem] lg:mr-28 lg:mt-8 lg:px-6 lg:py-2 lg:text-start lg:text-[1.1rem]">
            O Reservation Mauá é o sistema de reservas de salas do Instituto
            Mauá de Tecnologia, projetado para facilitar o agendamento de
            espaços para estudos, reuniões e eventos acadêmicos.
          </p>
          <div className="mt-4 flex items-center justify-center sm:items-center sm:justify-center md:mt-2 md:items-start md:justify-start md:px-6 lg:mt-8">
            <Button className="w-52 text-[1rem] font-semibold sm:w-48 sm:p-2 sm:text-[1.3rem] md:mt-12 md:w-48 md:p-[0.4rem] md:text-[1.2rem] lg:w-52 lg:px-0 lg:text-xl">
              Menu de Reservas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
