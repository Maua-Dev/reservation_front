import { Button } from './button'
import { CalendaryCard } from './calendary-card'

const reservas = [
  {
    id: 1,
    court: 'Quadra1',
    court_number: 1,
    modality: 'Basquete',
    time: '1738252800000'
  },
  {
    id: 2,
    court: 'Quadra2',
    court_number: 2,
    modality: 'Vôlei',
    time: '1738407600000'
  },

  {
    id: 7,
    court: 'Quadra2',
    court_number: 2,
    modality: 'Vôlei',
    time: '1738069200000'
  },
  {
    id: 4,
    court: 'Quadra2',
    court_number: 2,
    modality: 'vôlei',
    time: '1738252800000'
  },
  {
    id: 5,
    court: 'Quadra3',
    court_number: 3,
    modality: 'futsal',
    time: '1738252800000'
  },
  {
    id: 6,
    court: 'Quadra3',
    court_number: 3,
    modality: 'Vôlei',
    time: '1738407600000'
  },
  {
    id: 8,
    court: 'Quadra1',
    court_number: 1,
    modality: 'Futsal',
    time: '1738238400000'
  },
  {
    id: 9,
    court: 'Quadra3',
    court_number: 3,
    modality: 'Vôlei',
    time: '1738238400000'
  },
  {
    id: 9,
    court: 'Quadra1',
    court_number: 1,
    modality: 'Vôlei',
    time: '1738159200000'
  },
  {
    id: 10,
    court: 'Quadra2',
    court_number: 2,
    modality: 'Basquete',
    time: '1738159200000'
  },
  {
    id: 11,
    court: 'Quadra1',
    court_number: 1,
    modality: 'Basquete',
    time: '1737997200000'
  },
  {
    id: 12,
    court: 'Quadra3',
    court_number: 3,
    modality: 'Basquete',
    time: '1738245600000'
  }
]

export function Court() {
  const today = new Date()

  // const isHighlightedTime = (hour: number) => {
  //   return hour >= 19 && hour <= 21
  // }

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

  const deslocation = (courtNumber: number, timestamp: number) => {
    const sameTimeReservations = reservas.filter(
      (reserva) => Number(reserva.time) === timestamp
    )

    const countSameTime = sameTimeReservations.length

    switch (courtNumber) {
      case 1:
        return 4
      case 2:
        return countSameTime > 1 ? (countSameTime > 2 ? 30 : 4) : 4
      case 3:
        return countSameTime > 1 ? (countSameTime > 2 ? 56 : 30) : 4
      default:
        return 4
    }
  }

  const reservasConvertidas = reservas.map((reserva) => {
    const date = new Date(Number(reserva.time))
    return {
      ...reserva,
      day: date.getDate(),
      hour: date.getHours()
    }
  })

  const handleClickedTime = (hour: number, dayIndex: number) => {
    // if (!isHighlightedTime(hour)) {
    const clickedTime = new Date()
    clickedTime.setDate(
      clickedTime.getDate() - clickedTime.getDay() + dayIndex + 1
    )
    clickedTime.setHours(hour)
    clickedTime.setMinutes(0)
    clickedTime.setSeconds(0)
    clickedTime.setMilliseconds(0)
    console.log(clickedTime)
    console.log(clickedTime.getTime())
    // }
  }

  return (
    <div className="w-full">
      <div className="relative h-44 w-full bg-quadra bg-cover bg-center">
        <div className="h-full w-full bg-black/50">
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
              <div className="flex min-h-28 min-w-20 max-w-20 items-start border-r border-gray-400 px-4 font-poppins">{`${hour}:00`}</div>
              <div className="flex flex-1">
                {[...Array(6)].map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    onClick={handleClickedTime.bind(null, hour, dayIndex)}
                    className={`relative flex flex-1 border-b border-r border-gray-400 bg-gray-200 p-2 last:border-r-0 hover:cursor-pointer hover:bg-gray-300`}
                  >
                    {reservasConvertidas.map((reserva, indexCard) => {
                      if (
                        reserva.hour === hour &&
                        reserva.day === thisWeek()[dayIndex]
                      ) {
                        return (
                          <div
                            key={reserva.id}
                            style={{
                              position: 'absolute',
                              left: `${deslocation(reserva.court_number, Number(reserva.time))}%`,
                              zIndex: reserva.court_number
                            }}
                          >
                            <CalendaryCard
                              court={reserva.court}
                              modality={reserva.modality}
                            />
                          </div>
                        )
                      }
                    })}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
