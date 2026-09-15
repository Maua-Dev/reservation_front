import logobranca from '../assets/logobranca.png'
import baixados from '../assets/baixados.jpg'
import { Button } from '../components/button'

import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../auth/auth-config'
import { useUser } from '../hooks/use-user'
import { useCallback, useEffect, useState } from 'react'
import { UserService } from '@/services/user-service'
import { AccountInfo } from '@azure/msal-browser'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'

export function Login() {
  const auth = useIsAuthenticated()
  const { instance } = useMsal()
  const navigate = useNavigate()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const { setUser } = useUser()

  // Busca o token e o usuário e já manda pra home certa. Antes isso era uma
  // corrente de dois useEffect (auth -> token -> user -> navigate), e cada elo
  // custava um render a mais parado na tela de login.
  const finishLogin = useCallback(
    async (account: AccountInfo) => {
      const { accessToken } = await instance.acquireTokenSilent({
        ...loginRequest,
        account
      })
      localStorage.setItem('accessToken', accessToken)

      const data = await UserService.getUser(accessToken)
      localStorage.setItem('user_id', data.userId)
      setUser(data)

      // replace: o botão de voltar não deve trazer de volta pro login
      navigate(data?.role === 'ADMIN' ? '/admin-home' : '/', { replace: true })
    },
    [instance, navigate, setUser]
  )

  // Já logado e caiu no /login (sessão do localStorage, link direto): redireciona.
  useEffect(() => {
    if (!auth || isSigningIn) return

    const account = instance.getActiveAccount() ?? instance.getAllAccounts()[0]
    if (!account) return

    setIsSigningIn(true)
    finishLogin(account).catch((error) => {
      console.error('[LOGIN] Erro ao restaurar a sessão:', error)
      setIsSigningIn(false)
    })
  }, [auth, isSigningIn, instance, finishLogin])

  const handleLogin = async () => {
    if (isSigningIn) return
    setIsSigningIn(true)
    try {
      const { account } = await instance.loginPopup(loginRequest)
      instance.setActiveAccount(account)
      await finishLogin(account)
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Não foi possível entrar. Tente novamente.')
      setIsSigningIn(false)
    }
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
                className="flex items-center gap-2 rounded-lg border bg-white p-4 text-center font-poppins text-base font-normal text-black disabled:cursor-not-allowed disabled:opacity-70 md:text-xl"
                onClick={handleLogin}
                disabled={isSigningIn}
              >
                {isSigningIn ? (
                  <FiLoader className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />
                ) : (
                  <img
                    src={baixados}
                    alt="Logo da Microsoft"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                )}
                {isSigningIn ? 'Entrando...' : 'Sign in with Microsoft'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
