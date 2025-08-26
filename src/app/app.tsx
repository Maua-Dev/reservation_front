import { CourtReserve } from '@/app/pages/court-reserve'
import { FieldBeachReserve } from '@/app/pages/fieldbeach-reserve'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { Login } from './pages/login'
import { Home } from './pages/home'
import AdminHome from './pages/admin/adminHome'
import AdminReport from './pages/admin/adminReport'
import AdminReserve from './pages/admin/adminReserve'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './auth/auth-config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RulesWarnings from './pages/rules-warnings'
import Terms from './pages/terms-of-use'

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
            limit={3}
            theme="colored"
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/court-reserve" element={<CourtReserve />} />
            <Route path="/rules-warnings" element={<RulesWarnings />} />
            <Route path="/terms-of-use" element={<Terms />} />
            <Route path="/fieldbeach-reserve" element={<FieldBeachReserve />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-report" element={<AdminReport />} />
            <Route path="/admin-reserve" element={<AdminReserve />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MsalProvider>
      </Router>
    </>
  )
}
