import { useState } from 'react'
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6'

type Props = {
  children: React.ReactNode[]
}

export default function Carousel({ children: slides }: Props) {
  const [curr, setCurr] = useState(0)

  const next = () =>
    setCurr((curr) =>
      curr === 0 ? curr + 1 : curr < slides.length - 1 ? curr + 1 : curr
    )

  const prev = () =>
    setCurr((curr) =>
      curr === slides.length - 1 ? curr - 1 : curr > 0 ? curr - 1 : curr
    )

  return (
    <div className="relative z-10 w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full p-1 text-white/80 shadow hover:text-white"
        >
          <FaCircleArrowLeft size={50} />
        </button>
        <button
          onClick={next}
          className="rounded-full p-1 text-white/80 shadow hover:text-white"
        >
          <FaCircleArrowRight size={50} />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full bg-white transition-all ${curr === i ? 'p-2' : 'bg-opacity-50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
