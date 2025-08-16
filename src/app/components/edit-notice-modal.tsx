import { IoClose } from 'react-icons/io5'
import { Button } from './button'
import { useRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import MonthCalendarAdmin from './month-calendary'

export default function NoticeModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )

  // Função chamada quando um dia é selecionado no calendário
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  // Função chamada quando o mês é alterado no calendário
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20">
      <div
        ref={modalRef}
        className="relative flex w-[640px] flex-col items-end bg-white p-6 shadow-lg"
      >
        <div className="mx-auto flex h-[44px] w-[400px] items-center justify-center rounded-xl bg-blue-primary text-center text-xl font-bold text-white">
          Adicionar Aviso
        </div>
        <button onClick={onClose} className="absolute right-4 top-4 text-black">
          <IoClose className="text-2xl" />
        </button>
        <div className="flex w-full flex-row justify-between gap-20">
          <div className="flex w-[180px] flex-col gap-2">
            <label className="pt-6 font-bold text-black">Tempo</label>
            <select
              className="rounded-lg bg-yellow px-4 py-2 text-sm text-black"
              defaultValue="24 horas"
            >
              <option value="24 horas">24 horas</option>
              <option value="48 horas">48 horas</option>
            </select>
            <label className="mt-36 font-bold text-black" htmlFor="titulo">
              TÍTULO:
            </label>
            <input
              id="titulo"
              type="text"
              className="w-full rounded border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="ml-4 w-[160px] flex-1">
            <MonthCalendarAdmin
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <textarea
            id="descricao"
            className="w-full rounded border border-gray-400 px-2 py-1"
            rows={3}
            placeholder="Descrição"
          />
        </div>
        <Button
          className="mt-4 bg-blue-primary px-16 py-2 text-base text-white"
          onClick={() => {
            toast.success('Novo aviso criado!')
            onClose()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
