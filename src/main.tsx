import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import { UserProvider } from './app/contexts/user-context.tsx'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './app/auth/auth-config.ts'
import './app/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <UserProvider>
        <App />
      </UserProvider>
    </MsalProvider>
  </React.StrictMode>
)
