import { createContext, ReactNode, useState } from 'react'
import { Booking } from '../hooks/use-booking'

type BookingsContextType = {
  allBookings: Booking[]
  myBookings: Booking[]
  setAllBookings: React.Dispatch<React.SetStateAction<Booking[]>>
  setMyBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

export const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined
)

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [myBookings, setMyBookings] = useState<Booking[]>([])

  return (
    <BookingsContext.Provider
      value={{ allBookings, myBookings, setAllBookings, setMyBookings }}
    >
      {children}
    </BookingsContext.Provider>
  )
}
