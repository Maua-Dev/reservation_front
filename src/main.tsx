import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import { UserProvider } from './app/contexts/user-context.tsx'
import { BookingsProvider } from './app/contexts/bookings-context.tsx'
import { MsalProvider } from '@azure/msal-react'
import { BrowserUtils } from '@azure/msal-browser'
import { msalInstance } from './app/auth/auth-config.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './app/styles/global.css'
import { AlertsProvider } from './app/contexts/alerts-context.tsx'

const queryClient = new QueryClient()

// O redirectUri do MSAL é '/', então a janela de popup do login volta para a
// raiz do app. Sem esse guard ela carregava o app inteiro (roteador, queries,
// tudo) só pra ser fechada logo em seguida — era isso que travava o login.
// A resposta do Azure é lida pelo `window.opener`, o popup não precisa de JS.
if (!BrowserUtils.isInPopup()) {
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
}
