import { useEffect, useState } from 'react'
import MonthCalendarAdmin from '@/app/components/month-calendar-admin'
import { LuDownload } from 'react-icons/lu'
import { IoIosCloseCircleOutline } from 'react-icons/io'

interface SelectDateModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export default function SelectDateModalAdmin({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect
}: SelectDateModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setCurrentMonth(selectedDate.getMonth())
      setCurrentYear(selectedDate.getFullYear())
    }
  }, [isOpen, selectedDate])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Tempo da animação de saída (300ms)
  }

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  const handleDateSelectAndClose = (date: Date) => {
    onDateSelect(date)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[999] mr-5 flex items-center justify-end transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`w-auto transform justify-items-center rounded-lg bg-white pt-2 pl-6 pr-2 pb-6 transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <div className="justify-items-center">
            <MonthCalendarAdmin
              selectedDate={selectedDate}
              onDateSelect={handleDateSelectAndClose}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
            <button className="flex h-[45px] w-[200px] items-center justify-center justify-items-center gap-4 rounded-lg bg-blue-primary font-poppins text-white">
              <LuDownload className="h-[30px] w-[30px]" />
              Relatório
            </button>
          </div>
          <button className="h-[35px] w-[35px] text-blue-primary">
            <IoIosCloseCircleOutline className="h-[35px] w-[35px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
