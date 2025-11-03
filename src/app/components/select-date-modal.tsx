import { useEffect, useState } from 'react'
import MonthCalendarAdmin from '@/app/components/month-calendar-admin'

interface SelectDateModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export default function SelectDateModal({
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
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`w-auto transform rounded-lg bg-white p-6 shadow-lg transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <MonthCalendarAdmin
          selectedDate={selectedDate}
          onDateSelect={handleDateSelectAndClose}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={handleMonthChange}
        />
      </div>
    </div>
  )
}
