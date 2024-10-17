import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import { UserProvider } from './app/contexts/user-context.tsx'
import './app/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
)
