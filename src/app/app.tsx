import { CourtReserve } from '@/app/pages/court-reserve'
import { FieldBeachReserve } from '@/app/pages/fieldbeach-reserve'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './auth/auth-config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <>
      <Router>
        <MsalProvider instance={msalInstance}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/court-reserve" element={<CourtReserve />} />
            <Route path="/fieldbeach-reserve" element={<FieldBeachReserve />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MsalProvider>
      </Router>
    </>
  )
}
