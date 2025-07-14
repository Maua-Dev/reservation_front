import { createContext, ReactNode, useState } from 'react'
import { Booking } from '../hooks/use-booking'

type BookingsContextType = {
  allbookings: Booking[]
  myBookings: Booking[]
  setAllBookings: React.Dispatch<React.SetStateAction<Booking[]>>
  setMyBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

export const BookingsContext = createContext<BookingsContextType | undefined>(
  undefined
)

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [allbookings, setAllBookings] = useState<Booking[]>([])
  const [myBookings, setMyBookings] = useState<Booking[]>([])

  return (
    <BookingsContext.Provider
      value={{ allbookings, myBookings, setAllBookings, setMyBookings }}
    >
      {children}
    </BookingsContext.Provider>
  )
}
