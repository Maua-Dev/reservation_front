import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Navbar } from './components/navbar'
import { Reservations } from './components/home-reservations'

export function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Reservations />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
