import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type Props = {
  children: React.ReactNode
}

export default function Carousel({ children: slides }: Props) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex">{slides}</div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button className="rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white">
          <IoIosArrowBack size={40} />
        </button>
        <button className="rounded-full bg-white/80 p-1 text-gray-800 shadow hover:bg-white">
          <IoIosArrowForward size={40} />
        </button>
      </div>
    </div>
  )
}
