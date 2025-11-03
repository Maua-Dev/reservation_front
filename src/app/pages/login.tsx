import logobranca from '../assets/logobranca.png'
import baixados from '../assets/baixados.jpg'
import { Button } from '../components/button'

import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../auth/auth-config'
import { useUser, useUserQuery } from '../hooks/use-user'
import { useEffect, useState } from 'react'
import { UserService } from '@/services/user-service'

export function Login() {
  const auth = useIsAuthenticated()
  const { instance } = useMsal()
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const { user, setUser } = useUser()

  useEffect(() => {
    const doLoginFlow = async () => {
      if (auth) {
        const accounts = instance.getAllAccounts()
        if (accounts.length > 0) {
          const accessToken = (
            await instance.acquireTokenSilent({
              ...loginRequest,
              account: accounts[0]
            })
          ).accessToken
          setToken(accessToken)
        } else {
          console.warn('[LOGIN] Nenhuma conta encontrada no MSAL.')
        }
      } else {
        console.warn('[LOGIN] Usuário não autenticado (auth=false)')
      }
    }
    doLoginFlow()
  }, [auth])

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const data = await UserService.getUser(token)
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user_id', data.userId)
        setUser(data)
        if (data && data.role === 'ADMIN') {
          navigate('/admin-home')
        } else {
          navigate('/')
        }
      }
      fetchUser()
    }
  }, [user, token])

  const handleLogin = () => {
    instance.loginPopup({ scopes: ['User.Read'] }).catch((error) => {
      console.error('Login error:', error)
    })
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-0 flex h-screen w-full bg-quadra bg-cover bg-center brightness-50" />
      <div className="absolute z-[1] flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-50 md:flex-row md:justify-between">
        <div className="flex h-1/3 w-1/2 max-w-xl items-center justify-center md:h-full">
          <img
            src={logobranca}
            alt="Logo do Mauá Reservation"
            className="w-4/5 max-w-lg md:w-1/2"
          />
        </div>
        <div className="hidden:bg-white/70 flex h-1/3 w-full flex-col items-center justify-center rounded-lg p-8 shadow-lg sm:w-4/5 sm:p-10 md:mb-0 md:h-full md:w-1/2 md:bg-white/70 md:p-12">
          <div className="flex max-w-xl flex-col items-center gap-4 rounded-lg bg-white p-4 text-justify sm:gap-6 xl:p-7">
            <p className="text-center font-poppins text-base text-black md:text-xl lg:text-2xl">
              Ao clicar no botão, você será redirecionado à página de login da
              Microsoft
            </p>
            <div className="flex justify-center">
              <Button
                className="flex items-center gap-2 rounded-lg border bg-white p-4 text-center font-poppins text-base font-normal text-black md:text-xl"
                onClick={handleLogin}
              >
                <img
                  src={baixados}
                  alt="Logo da Microsoft"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
                Sign in with Microsoft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
