import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import { UserProvider } from './app/contexts/user-context.tsx'
import { BookingsProvider } from './app/contexts/bookings-context.tsx'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './app/auth/auth-config.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './app/styles/global.css'
import { AlertsProvider } from './app/contexts/alerts-context.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BookingsProvider>
          <AlertsProvider>
            <MsalProvider instance={msalInstance}>
              <App />
            </MsalProvider>
          </AlertsProvider>
        </BookingsProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
