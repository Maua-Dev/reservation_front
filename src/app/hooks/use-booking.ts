import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BookingType } from '@/utils/enums/booking-type'
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
  type?: BookingType
  owner_name?: string
  owner_network_id?: string
}

// Chaves das queries que mostram reservas na tela. Toda mutação precisa
// invalidar todas elas, senão a agenda continua exibindo o cache antigo.
const BOOKING_QUERY_KEYS = [
  ['bookingsOfTheWeek'],
  ['bookingsOfTheWeekAdmin'],
  ['myBookings']
]

export const useBookingsQuery = () => {
  // Tem que ser o client do QueryClientProvider (main.tsx). Antes existia um
  // `new QueryClient()` solto neste arquivo: invalidar nele não mexia no cache
  // que a tela usa, então o card só aparecia quando o staleTime expirava.
  const queryClient = useQueryClient()

  // `refetchType: 'none'` marca as queries como stale sem refazer o GET agora.
  // O GET imediato depois de um POST/DELETE é uma corrida: se o backend ainda
  // não enxerga a escrita, a resposta antiga sobrescreve o cache e a reserva
  // nova some da tela. Quem tem o dado certo aqui é a mutação, não o refetch.
  // Marcadas como stale, as queries se atualizam sozinhas no próximo gatilho
  // natural (montar a tela, voltar o foco da aba, trocar a semana).
  const invalidateBookings = () =>
    Promise.all(
      BOOKING_QUERY_KEYS.map((queryKey) =>
        queryClient.invalidateQueries({ queryKey, refetchType: 'none' })
      )
    )

  // Escreve o resultado da mutação direto no cache: é o que faz o card aparecer
  // (ou sumir) na hora, sem depender de nenhuma ida ao servidor.
  const patchBookingsCache = (
    update: (bookings: Booking[]) => Booking[]
  ): void => {
    BOOKING_QUERY_KEYS.forEach((queryKey) => {
      queryClient.setQueryData<MyBookingsResponse>(queryKey, (old) =>
        old ? { ...old, bookings: update(old.bookings) } : old
      )
    })
  }

  const getMyBookingsQuery = useQuery<MyBookingsResponse, Error>({
    queryKey: ['myBookings'],
    queryFn: async () => {
      const userId = localStorage.getItem('user_id')
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

  const getBookingsOfTheWeekAdmin = useQuery({
    queryKey: ['bookingsOfTheWeekAdmin'],
    queryFn: async () => {
      try {
        const data = await BookingsService.getBookingsOfTheWeekAdmin()
        return data
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
    // Sem await de propósito: o `mutateAsync` resolve assim que o POST volta,
    // pra quem chamou poder fechar o modal na hora.
    onSuccess: (created, sent) => {
      // A resposta do create manda o booking_id; se vier em outro formato,
      // cai pro que foi enviado e o refetch corrige o id logo em seguida.
      const booking: Booking = created?.start_date
        ? { ...sent, ...created }
        : sent

      patchBookingsCache((bookings) => [...bookings, booking])
      invalidateBookings()
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
    onSuccess: (_, bookingId) => {
      patchBookingsCache((bookings) =>
        bookings.filter((booking) => booking.booking_id !== bookingId)
      )
      invalidateBookings()
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
        const data = await BookingsService.getBookingsOfTheWeek()
        return data
      } catch (error) {
        toast.error('Erro ao buscar reservas!: ' + error)
        throw new Error('Failed to fetch bookings')
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5 // 5 minutos
  })

  return {
    getBookingsOfTheWeekAdmin,
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
