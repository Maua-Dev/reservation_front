import { Button } from './button'

export function Court() {
  const today = new Date()

  const isHighlightedTime = (hour: number) => {
    return hour >= 19 && hour <= 21
  }

  const thisMonth = () => {
    switch (today.getMonth()) {
      case 0:
        return 'Janeiro'
      case 1:
        return 'Fevereiro'
      case 2:
        return 'Março'
      case 3:
        return 'Abril'
      case 4:
        return 'Maio'
      case 5:
        return 'Junho'
      case 6:
        return 'Julho'
      case 7:
        return 'Agosto'
      case 8:
        return 'Setembro'
      case 9:
        return 'Outubro'
      case 10:
        return 'Novembro'
      case 11:
        return 'Dezembro'
    }
  }

  const thisWeek = () => {
    const week = []
    for (let i = 1; i <= 6; i++) {
      const day = new Date(today)
      day.setDate(today.getDate() - today.getDay() + i)
      week.push(day.getDate())
    }
    return week
  }

  const handleClickedTime = (hour: number, dayIndex: number) => {
    if (!isHighlightedTime(hour)) {
      const clickedTime = new Date()
      clickedTime.setDate(
        clickedTime.getDate() - clickedTime.getDay() + dayIndex + 1
      )
      clickedTime.setHours(hour)
      clickedTime.setMinutes(0)
      clickedTime.setSeconds(0)
      console.log(clickedTime)
      console.log(clickedTime.getTime())
    }
  }

  return (
    <div>
      <div className="relative h-44 w-screen bg-quadra">
        <div className="absolute bottom-0 left-0 p-5 font-poppins text-white">
          <p className="text-3xl font-semibold">Quadras</p>
          <p className="text-2xl font-normal">
            {thisMonth()}, {thisWeek()[0]}-{thisWeek()[5]}
          </p>
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
            {thisWeek().map((date, index) => (
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
                    onClick={handleClickedTime.bind(null, hour, dayIndex)}
                    className={`flex-1 border-b border-r border-gray-400 p-2 last:border-r-0 ${
                      isHighlightedTime(hour)
                        ? 'bg-red-200'
                        : 'bg-gray-200 hover:cursor-pointer hover:bg-gray-300'
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
