export default function MonthCalendar() {
  const today = new Date()

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center bg-white p-4">
      <div className="grid grid-cols-7 gap-2 text-center">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
          <div
            key={index}
            className="flex h-8 items-center justify-center font-bold text-gray-600 md:h-10"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }, (_, index) => {
          const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          )
          const day = index - firstDayOfMonth.getDay() + 1
          const date = new Date(today)
          date.setDate(day)

          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth()

          const isCurrentMonth = date.getMonth() === today.getMonth()

          return (
            <div
              key={index}
              className={`flex h-6 w-6 items-center justify-center rounded-full md:h-7 md:w-7 ${
                isToday
                  ? 'rounded-full bg-gray-300 text-white'
                  : isCurrentMonth
                    ? 'text-gray-600 hover:cursor-pointer hover:bg-blue-100'
                    : 'text-gray-400'
              }`}
            >
              {isCurrentMonth ? date.getDate() : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}
