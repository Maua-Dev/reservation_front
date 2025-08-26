import Footer from '@/app/components/footer'
import { Dev } from '@/app/components/dev'
import { About } from '../components/about'
import { Reservations } from '../components/reservations'
import { useNavigate } from 'react-router-dom'
import { useUser, useUserQuery } from '../hooks/use-user'
import { toast } from 'react-toastify'

export function Home() {
  useUserQuery()
  const { user } = useUser()
  const navigate = useNavigate()
  if (user && user.role === 'ADMIN') {
    toast.success('Welcome back, Admin!')
    navigate('/admin-portal')
  }
  return (
    <main className="flex h-auto flex-col items-center justify-center">
      <About />
      <Reservations />
      <Dev />
      <Footer />
    </main>
  )
}
