import Footer from '@/app/components/footer'
import { Dev } from '@/app/components/dev'
import { About } from '../components/about'
import { Reservations } from '../components/reservations'
import { useNavigate } from 'react-router-dom'
import { useUser, useUserQuery } from '../hooks/use-user'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export function Home() {
  const { user } = useUser()
  const navigate = useNavigate()
  console.log(user)
  useUserQuery()

  const CheckIsAdmin = async () => {
    if (user && user.role === 'ADMIN') {
      toast.success('Welcome back, Admin!')
      navigate('/admin-home')
    }
  }

  useEffect(() => {
    CheckIsAdmin()
  }, [user])

  return (
    <main className="flex h-auto flex-col items-center justify-center">
      <About />
      <Reservations />
      <Dev />
      <Footer />
    </main>
  )
}
