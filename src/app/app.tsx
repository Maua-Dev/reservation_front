import { ReserveCampoBeach } from '@/app/pages/reserve-campobeach'
import { ReserveQuadra } from '@/app/pages/reserve-quadra'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { Home } from './pages/home'

export function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserve-quadra" element={<ReserveQuadra />} />
          <Route path="/reserve-campobeach" element={<ReserveCampoBeach />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
