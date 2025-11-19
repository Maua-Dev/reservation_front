import { alertsApi } from '@/infrastructure/http/api'

export const AlertsService = {
  getAlerts: async () => {
    try {
      const response = await alertsApi.get('/get-all-alerts')
      return response
    } catch (error) {
      console.error('Error fetching alerts:', error)
      throw error
    }
  },
  createAlert: async (alert: CreateAlert) => {
    try {
      const accessToken = localStorage.getItem('accessToken') || ''
      const response = await alertsApi.post('/create-alert', alert, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      return response.data
    } catch (error) {
      console.error('Error creating alert:', error)
      throw error
    }
  },

  deleteAlert: async (alert_id: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken') || ''
      await alertsApi.delete(`/delete-alert`, {
        params: { alert_id },
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    } catch (error) {
      console.error('Error deleting alert:', error)
      throw error
    }
  }
}

export interface CreateAlert {
  title: string
  description: string
  start_date: number
  end_date: number
  is_rule: boolean
}
