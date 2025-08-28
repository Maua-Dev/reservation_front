import { createContext, ReactNode, useEffect, useState } from 'react'
import { useAlertsQuery } from '../hooks/use-alerts'
import { CreateAlert } from '@/services/alerts-service'

export interface Alert {
  alert_id: string
  title: string
  description: string
  start_date: number
  end_date: number
  is_rule: boolean
}

export interface AlertsContextType {
  alerts: {
    alert: Alert
  }[]
  addAlert: (alert: CreateAlert) => void
  removeAlert: (alert_id: string) => void
}

export const alertContext = createContext<AlertsContextType>({
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {}
})

export const AlertsProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<{ alert: Alert }[]>([])

  const { getAlerts, createAlert, deleteAlert } = useAlertsQuery()

  const addAlert = (alert: CreateAlert) => {
    createAlert.mutate(alert, {
      onSuccess: () => {
        getAlerts.refetch()
      }
    })
  }

  const removeAlert = (alert_id: string) => {
    deleteAlert.mutate(alert_id, {
      onSuccess: () => {
        getAlerts.refetch()
      }
    })
  }

  useEffect(() => {
    if (getAlerts.data?.Alerts) {
      setAlerts(getAlerts.data.Alerts)
    }
  }, [getAlerts.data])

  return (
    <alertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </alertContext.Provider>
  )
}
