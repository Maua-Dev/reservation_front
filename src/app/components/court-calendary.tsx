import { Button } from './button'

export function Court() {
  const isHighlightedTime = (hour) => {
    return hour >= 19 && hour <= 21
  }

  return (
    <div>
      <div className="relative h-56 w-screen bg-quadra">
        <div className="absolute bottom-0 left-0 p-5 font-poppins text-white">
          <p className="text-2xl font-semibold">Quadras</p>
          <p className="text-xl font-normal">Janeiro, 06-11</p>
        </div>
        <div className="absolute bottom-0 right-0 p-8">
          <Button className="h-12 w-52 p-1">Verificar Reserva</Button>
        </div>
      </div>

      <div>
        <div className="flex font-poppins text-base font-semibold text-gray-600">
          <div className="w-24 bg-blue-primary p-4 text-xl text-white">
            Hora
          </div>
          <div className="flex flex-1 text-center text-lg text-white">
            {[6, 7, 8, 9, 10, 11].map((date, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center justify-center bg-blue-primary p-1 text-xl font-normal"
              >
                <div>{date}</div>
                <div>
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                </div>{' '}
              </div>
            ))}
          </div>
        </div>
        <div className="h-12 border-gray-400"></div>
        {[...Array(14)].map((_, index) => {
          const hour = 8 + index
          return (
            <div key={index} className="flex">
              <div className="flex h-16 w-20 items-start border-r border-gray-400 px-4">{`${hour}:00`}</div>
              <div className="flex flex-1">
                {[...Array(6)].map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`flex-1 border-b border-r border-gray-400 p-2 last:border-r-0 ${
                      isHighlightedTime(hour) ? 'bg-red-200' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
