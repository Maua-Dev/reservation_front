// import { useIsAuthenticated } from '@azure/msal-react'
// import { BookingsContext } from '../contexts/bookings-context'
// import { useContext } from 'react'
// import { BookingsService } from '@/services/bookings-service'

export interface Booking {
  start_date: number
  end_date: number
  court_number: number
  sport: string
  user_id?: string
  booking_id?: string
  materials: string[]
}

// export const useBookings = () => {
//   const context = useContext(BookingsContext)

//   if (!context) {
//     throw new Error('useBookings must be used within a BookingsProvider')
//   }

//   const { setAllBookings, setMyBookings } = context

//   async function getMyBookings() {
//     try {
//       const myBookings = await BookingsService.getMyBookings()
//       console.log('User Bookings:', myBookings)
//       setMyBookings(myBookings.bookings)
//       return myBookings.bookings
//     } catch (error) {
//       console.error('Failed to fetch user:', error)
//     }
//   }

//   async function createBooking(booking: Booking) {
//     try {
//       const newBooking = await BookingsService.createBooking(booking)
//       setAllBookings((prevBookings) => [...prevBookings, newBooking])
//       return newBooking
//     } catch (error) {
//       console.error('Failed to create booking:', error)
//     }
//   }

//   return { getMyBookings, createBooking }
// }

// src/app/hooks/use-bookings-query.ts
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import {
  BookingsService,
  MyBookingsResponse
} from '@/services/bookings-service'

export const queryClient = new QueryClient()

export const useBookingsQuery = () => {
  const getMyBookingsQuery = useQuery<MyBookingsResponse, Error>({
    queryKey: ['myBookings'],
    queryFn: async () => {
      const userId = localStorage.getItem('userId')
      if (!userId) throw new Error('User ID not found')

      try {
        return await BookingsService.getMyBookings() //Criar uma função para o meu try
      } catch (error) {
        throw new Error('Failed to fetch bookings')
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5 // 5 minutos
  })

  const createBookingMutation = useMutation<Booking, Error, Booking>({
    mutationFn: (booking) => BookingsService.createBooking(booking),
    onSuccess: () => {
      // Invalida a query de reservas para refetch após criar uma nova
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })

  const deleteBookingMutation = useMutation<void, Error, string>({
    mutationFn: (bookingId) => BookingsService.deleteBooking(bookingId),
    onSuccess: () => {
      // Invalida a query de reservas para refetch após deletar uma
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    }
  })

  const getBookingsOfTheWeek = useQuery({
    queryKey: ['bookingsOfTheWeek'],
    queryFn: async () => {
      try {
        return await BookingsService.getBookingsOfTheWeek() //Criar uma função para o meu try
      } catch (error) {
        throw new Error('Failed to fetch bookings')
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5 // 5 minutos
  })

  return {
    getMyBookingsQuery,
    createBookingMutation,
    getBookingsOfTheWeek,
    deleteBookingMutation
  }
}
