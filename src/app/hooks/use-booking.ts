import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import {
  BookingsService,
  MyBookingsResponse
} from '@/services/bookings-service'
import { useContext } from 'react'
import { BookingsContext } from '../contexts/bookings-context'
import { toast } from 'react-toastify'

export interface Booking {
  start_date: number
  end_date: number
  court_number: number
  sport: string
  user_id?: string
  booking_id?: string
  materials: string[]
}

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
        toast.error('Erro ao buscar reservas!: ' + error)
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
      queryClient.invalidateQueries({ queryKey: ['bookingsOfTheWeek'] })
      queryClient.invalidateQueries({ queryKey: ['myBookings'] })
      getMyBookingsQuery.refetch()
      toast.success('Reserva criada com sucesso!')
    },
    onError: (error) => {
      if (error.message === 'Booking already exists') {
        toast.error('Já existe uma reserva para esse horário!')
      } else {
        toast.error('Erro ao criar reserva!')
      }
    }
  })

  const deleteBookingMutation = useMutation<void, Error, string>({
    mutationFn: (bookingId) => BookingsService.deleteBooking(bookingId),
    onSuccess: () => {
      // Invalida a query de reservas para refetch após deletar uma
      queryClient.invalidateQueries({ queryKey: ['bookingsOfTheWeek'] })
      queryClient.invalidateQueries({ queryKey: ['myBookings'] })
      toast.success('Reserva cancelada com sucesso!')
    },
    onError: (error) => {
      if (error.message === 'Booking not found') {
        toast.error('Reserva não encontrada!')
      } else {
        toast.error('Erro ao cancelar reserva!')
      }
    }
  })

  const getBookingsOfTheWeek = useQuery({
    queryKey: ['bookingsOfTheWeek'],
    queryFn: async () => {
      try {
        return await BookingsService.getBookingsOfTheWeek() //Criar uma função para o meu try
      } catch (error) {
        toast.error('Erro ao buscar reservas!: ' + error)
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

export const useBookings = () => {
  const context = useContext(BookingsContext)

  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider')
  }

  return context
}
