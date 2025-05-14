import { Booking } from '@/app/hooks/use-booking'
import { bookingsApi } from '@/infrastructure/http/api'
import { AxiosError } from 'axios'

export interface MyBookingsResponse {
  bookings: Booking[]
  message: string
}

export const BookingsService = {
  getMyBookings: async (): Promise<MyBookingsResponse> => {
    const userId = await localStorage.getItem('userId')
    try {
      const response = await bookingsApi.get<MyBookingsResponse>(
        '/get-bookings',
        {
          params: { user_id: userId }
        }
      )
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 404) {
        return {
          bookings: [],
          message: 'No bookings found'
        }
      }
      throw new Error('Failed to fetch bookings')
    }
  },

  createBooking: async (booking: Booking): Promise<Booking> => {
    const userId = await localStorage.getItem('userId')
    try {
      const response = await bookingsApi.post<Booking>('/create-booking', {
        ...booking,
        user_id: userId
      })
      return response.data
    } catch (error) {
      throw new Error('Failed to create booking')
    }
  }
}
