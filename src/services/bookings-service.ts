import { Booking } from '@/app/hooks/use-booking'
import { bookingsApi } from '@/infrastructure/http/api'
import { AxiosError } from 'axios'

export interface MyBookingsResponse {
  bookings: Booking[]
  message: string
}

export const BookingsService = {
  getMyBookings: async (): Promise<MyBookingsResponse> => {
    const userId = await localStorage.getItem('user_id')
    const start_date = await localStorage.getItem('start_date')
    const end_date = await localStorage.getItem('end_date')
    try {
      const response = await bookingsApi.get<MyBookingsResponse>(
        'get-bookings',
        {
          params: {
            user_id: userId,
            start_date: start_date,
            end_date: end_date
          }
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
  getBookingsOfTheWeek: async (): Promise<MyBookingsResponse> => {
    const start_date = await localStorage.getItem('start_date')
    const end_date = await localStorage.getItem('end_date')
    try {
      const response = await bookingsApi.get<MyBookingsResponse>(
        'get-bookings',
        {
          params: { start_date: start_date, end_date: end_date }
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
    try {
      const accessToken = await localStorage.getItem('accessToken')
      const response = await bookingsApi.post<Booking>(
        'create-booking',
        { ...booking },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      return response.data
    } catch (error) {
      throw new Error('Failed to create booking')
    }
  },

  deleteBooking: async (bookingId: string): Promise<void> => {
    try {
      const response = await bookingsApi.delete('delete-booking', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        params: {
          booking_id: bookingId
        }
      })
      return response.data
    } catch (error) {
      throw new Error('Failed to delete booking')
    }
  }
}
