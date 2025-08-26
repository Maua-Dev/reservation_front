interface MonthCalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  currentMonth: number
  currentYear: number
  onMonthChange: (month: number, year: number) => void
}

export default function MonthCalendarAdmin({
  selectedDate,
  onDateSelect,
  currentMonth,
  currentYear,
  onMonthChange
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
      {/* Cabeçalho com navegação entre meses */}
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={() => {
            const newMonth = currentMonth === 0 ? 11 : currentMonth - 1
            const newYear = currentMonth === 0 ? currentYear - 1 : currentYear
            onMonthChange(newMonth, newYear)
          }}
          className="text-gray-600 hover:text-blue-500"
        >
          &lt;
        </button>
        <span className="font-semibold text-gray-700">
          {new Date(currentYear, currentMonth).toLocaleString('pt-BR', {
            month: 'long',
            year: 'numeric'
          })}
        </span>
        <button
          onClick={() => {
            const newMonth = currentMonth === 11 ? 0 : currentMonth + 1
            const newYear = currentMonth === 11 ? currentYear + 1 : currentYear
            onMonthChange(newMonth, newYear)
          }}
          className="text-gray-600 hover:text-blue-500"
        >
          &gt;
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid w-full grid-cols-7 gap-2 text-center">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="flex h-6 w-6 items-center justify-center font-bold text-gray-600 md:h-10"
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
