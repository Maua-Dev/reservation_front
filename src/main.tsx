import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import { UserProvider } from './app/contexts/user-context.tsx'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './app/auth/auth-config.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './app/styles/global.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <UserProvider>
          <App />
        </UserProvider>
      </MsalProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
