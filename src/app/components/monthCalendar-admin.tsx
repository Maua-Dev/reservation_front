interface MonthCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  currentMonth: number
  currentYear: number
}

export default function MonthCalendarAdmin({
  selectedDate,
  onDateSelect,
  currentMonth,
  currentYear
}: MonthCalendarProps) {
  // Função para verificar se uma data está na semana selecionada
  const isInSelectedWeek = (date: Date) => {
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    return date >= startOfWeek && date <= endOfWeek
  }

  // Função para verificar se é hoje
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Obter o primeiro dia do mês atual
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

  // Dias da semana (Domingo a Sábado)
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center bg-white p-4">
      {/* Dias da semana */}
      <div className="grid w-full grid-cols-7 gap-2 text-center">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="flex h-8 items-center justify-center font-bold text-gray-600 md:h-10"
          >
            {day}
          </div>
        ))}

        {/* Dias do mês */}
        {Array.from({ length: 42 }, (_, index) => {
          const day = index - firstDayOfMonth.getDay() + 1
          const date = new Date(currentYear, currentMonth, day)

          const isCurrentMonth = date.getMonth() === currentMonth
          const isSelectedWeek = isInSelectedWeek(date)
          const isSelectedDay =
            date.toDateString() === selectedDate.toDateString()

          return (
            <div
              key={index}
              className={`flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 ${
                isSelectedDay
                  ? 'bg-blue-500 text-white'
                  : isSelectedWeek
                    ? 'bg-blue-100'
                    : isToday(date)
                      ? 'bg-gray-300 text-white'
                      : isCurrentMonth
                        ? 'text-gray-600 hover:cursor-pointer hover:bg-gray-100'
                        : 'text-gray-400'
              }`}
              onClick={() => isCurrentMonth && onDateSelect(date)}
            >
              {isCurrentMonth ? date.getDate() : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}
