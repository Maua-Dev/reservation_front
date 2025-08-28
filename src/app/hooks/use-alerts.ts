import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Alert,
  alertContext,
  AlertsContextType
} from '../contexts/alerts-context'
import { AlertsService, CreateAlert } from '@/services/alerts-service'
import { queryClient } from './use-booking'
import { toast } from 'react-toastify'
import { useContext } from 'react'

export const useAlertsQuery = () => {
  const createAlert = useMutation({
    mutationFn: async (alert: CreateAlert): Promise<Alert> => {
      const response = await AlertsService.createAlert(alert)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
      getAlerts.refetch()
      toast.success('Alerta criado com sucesso!')
    },
    onError: (error) => {
      toast.error('Erro ao criar alerta!')
      console.log(error)
    },
    retry: 2
  })

  const getAlerts = useQuery({
    queryKey: ['alerts'],
    queryFn: async (): Promise<{
      Alerts: { alert: Alert }[]
      message: string
    }> => {
      const response = await AlertsService.getAlerts()
      return response.data
    },
    staleTime: 1000 * 60 * 5,
    retry: 2
  })

  const deleteAlert = useMutation({
    mutationFn: async (alert_id: string): Promise<void> => {
      await AlertsService.deleteAlert(alert_id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
      toast.success('Alerta deletado com sucesso!')
    },
    onError: (error) => {
      toast.error('Erro ao deletar alerta!')
      console.log(error)
    },
    retry: 2
  })

  return {
    createAlert,
    getAlerts,
    deleteAlert
  }
}

export const useAlerts = (): AlertsContextType => {
  const context = useContext(alertContext)
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider')
  }
  return context
}
