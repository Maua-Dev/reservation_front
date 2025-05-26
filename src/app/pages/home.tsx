import Footer from '@/app/components/footer'
import { Dev } from '@/app/components/dev'
import { About } from '../components/about'
import { Reservations } from '../components/reservations'
import { useMsal } from '@azure/msal-react'
import { useEffect } from 'react'

export function Home() {
  const { instance } = useMsal()

  const fetchAccessToken = async () => {
    const accounts = instance.getAllAccounts()
    if (accounts.length === 0) return
    const accessToken = (
      await instance.acquireTokenSilent({
        scopes: ['User.Read'],
        account: accounts[0]
      })
    ).accessToken
    localStorage.setItem('accessToken', accessToken)
    return accessToken
  }

  useEffect(() => {
    fetchAccessToken()
  }, [])

  return (
    <main className="flex h-auto flex-col items-center justify-center">
      <About />
      <Reservations />
      <Dev />
      <Footer />
    </main>
  )
}
