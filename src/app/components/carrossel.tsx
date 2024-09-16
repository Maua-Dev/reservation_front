import { useState } from 'react'
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6'
import { MdCircle } from 'react-icons/md'

type Props = {
  children: React.ReactNode[]
  onSlideChange?: (index: number) => void
}

export function Carousel({ children: slides }: Props) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full min-w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full p-1 text-white/80 shadow hover:text-white"
          title="Anterior"
        >
          <FaCircleArrowLeft size={30} />
        </button>

        <button
          onClick={next}
          className="rounded-full p-1 text-white/80 shadow hover:text-white"
          title="Próximo"
        >
          <FaCircleArrowRight size={30} />
        </button>
      </div>
      <div className="mt-5 flex justify-center">
        {slides.map((_, index) => (
          <MdCircle
            key={index}
            className={`w-8 transition-all ${
              curr === index ? 'h-5 w-6 text-white' : 'h-4 w-6 text-white/50'
            } hidden md:flex`}
          />
        ))}
      </div>
    </div>
  )
}
