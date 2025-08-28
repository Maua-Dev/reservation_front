import { Button } from './button'
import { useEffect, useState, useContext } from 'react'
import MonthCalendarAdmin from './month-calendar-admin'
import { alertContext } from '../contexts/alerts-context'

export default function NoticeModal({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [alertType, setAlertType] = useState<string>('24_hours')
  const { addAlert } = useContext(alertContext)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleSave = () => {
    const data = {
      title: title,
      description: description,
      start_date: selectedDate.getTime(),
      end_date:
        alertType === '24_hours'
          ? selectedDate.getTime() + 86400000
          : selectedDate.getTime() + 172800000,
      is_rule: false
    }
    addAlert(data)
    handleClose()
  }

  // Função chamada quando um dia é selecionado no calendário
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  // Função chamada quando o mês é alterado no calendário
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  return (
    <div className={`fixed inset-0 z-[999] flex items-center justify-center`}>
      <div
        className={`fixed inset-0 z-0 bg-black bg-opacity-50 backdrop-blur-md duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative z-10 w-[640px] rounded-lg bg-white p-6 pt-8 font-poppins shadow-lg transition-all duration-200 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 text-3xl text-gray-500 hover:cursor-pointer hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>
        <header className="flex h-12 w-full items-center justify-start gap-6 border-b-2 border-black px-4 pb-6">
          <h2 className="text-2xl font-semibold text-blue-primary">
            Adicionar Aviso
          </h2>
        </header>
        <div className="flex w-full flex-row justify-between gap-20">
          <div className="flex w-[180px] flex-col gap-2">
            <label className="pt-6 font-bold text-black">Tempo</label>
            <select
              className="rounded-lg bg-yellow px-4 py-2 text-base text-black"
              defaultValue="24_hours"
              onChange={(e) => {
                setAlertType(e.target.value)
              }}
            >
              <option value="24_hours">24 horas</option>
              <option value="48_hours">48 horas</option>
            </select>
          </div>
          <div className="ml-4 w-[180px] flex-1">
            <MonthCalendarAdmin
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
          </div>
        </div>
        <div className="mb-6 flex w-full flex-col items-start">
          <label className="font-poppins font-bold text-black" htmlFor="titulo">
            Título:
          </label>
          <input
            id="titulo"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-400 px-2 py-1 text-black"
          />
        </div>
        <div className="flex w-full flex-col">
          <textarea
            id="descricao"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-gray-400 px-2 py-1 text-lg text-black"
            rows={3}
            placeholder="Descrição"
          />
        </div>
        <Button
          className="mt-4 bg-blue-primary px-16 py-2 text-base text-white"
          onClick={handleSave}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
