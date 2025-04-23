import { useState } from "react"
import MonthCalendarAdmin from "./monthCalendar-admin"
import { ReservationCardAdmin } from "./reservation-view-admin"

export function ViewAdmin() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )

  const handleCancel = (date: string) => {
    console.log(`Cancel reservation on ${date}`)
  }

  // Função para obter o primeiro dia (Domingo) da semana
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day
    const startOfWeek = new Date(date)
    startOfWeek.setDate(diff)
    startOfWeek.setHours(0, 0, 0, 0)
    return startOfWeek
  }

  // Função para obter o último dia (Sábado) da semana
  const getEndOfWeek = (date: Date) => {
    const startOfWeek = getStartOfWeek(new Date(date))
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    return endOfWeek
  }

  const startOfWeek = getStartOfWeek(selectedDate)
  const endOfWeek = getEndOfWeek(selectedDate)

  const bookings = [
    {
      startDate: 1745494200000,
      endDate: 1745497800000,
      court: "1",
      status: "Aprovado",
      date: "24/04"
    },
    {
      startDate: 1745442000000,
      endDate: 1745445600000,
      court: "1",
      status: "Aprovado",
      date: "23/04"
    },
    {
      startDate: 1745938800000,
      endDate: 1745942400000,
      court: "1",
      status: "Aprovado",
      date: "29/04"
    },
    {
      startDate: 1746014400000,
      endDate: 1746018000000,
      court: "2",
      status: "Aprovado",
      date: "30/04"
    },
    {
      startDate: 1744722000000,
      endDate: 1744725600000,
      court: "2",
      status: "Aprovado",
      date: "15/04"
    },
    {
      startDate: 1744056000000,
      endDate: 1744059600000,
      court: "2",
      status: "Aprovado",
      date: "07/05"
    }
  ]

  const weeklyBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate)
    return bookingDate >= startOfWeek && bookingDate <= endOfWeek
  })

  // Função chamada quando um dia é selecionado no calendário
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  // Função chamada quando o mês é alterado no calendário
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  // Formatar data para exibição
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit"
    })
  }

  return (
    <main className='flex w-full flex-col bg-white pt-24'>
      <div className='flex h-full w-full flex-col'>
        <div className='flex h-full w-full flex-col md:flex-row'>
          {/* Coluna do calendário */}
          <div className='flex h-auto w-[45%] flex-grow flex-col bg-white'>
            <h1 className='flex h-20 w-full items-center justify-center bg-blue-primary p-4 text-xl text-white'>
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric"
              })}
            </h1>
            <div className='px-12 py-4'>
              <MonthCalendarAdmin
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                currentMonth={currentMonth}
                currentYear={currentYear}
                onMonthChange={handleMonthChange}
              />
            </div>
          </div>

          {/* Coluna da semana */}
          <div className='flex h-full w-full flex-grow flex-col bg-white'>
            <div className='flex h-20 w-full items-center justify-center bg-blue-primary p-4 text-xl text-white'>
              Semana {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
            </div>
            <div className='flex h-full w-full flex-col items-center gap-4 overflow-scroll px-40 pt-4'>
              {weeklyBookings.length > 0 ? (
                weeklyBookings.map((booking, index) => (
                  <ReservationCardAdmin
                    key={index}
                    startDate={booking.startDate}
                    endDate={booking.endDate}
                    court={booking.court}
                    status={booking.status}
                    onCancel={() => handleCancel(booking.date)}
                  />
                ))
              ) : (
                <p className='text-gray-500'>Nenhum agendamento nesta semana</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
