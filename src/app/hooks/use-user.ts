import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { loginRequest } from '../auth/auth-config'

export interface UserResponse {
  user: {
    user_id: string
    name: string
    ra: string
    email: string
    role: string
    confirm_user: boolean
  }
  message: string
}

export interface User {
  user_id: string
  name: string
  ra: string
  email: string
  role: string
  confirm_user: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_USER_URL
})

export const useGetUser = (accessToken: string | null) => {
  return useQuery({
    queryKey: ['user'],
    retry: 2,
    enabled: !!accessToken, // Só executa se o accessToken estiver disponível
    queryFn: async () => {
      const response = await api.get<UserResponse>('/get-user', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      return response.data
    }
  })
}

export const UseUser = () => {
  const { instance } = useMsal()
  const context = useContext(UserContext)
  const isAuth = useIsAuthenticated()

  const getAccessToken = useCallback(async () => {
    try {
      const accounts = instance.getAllAccounts()
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })

      return response.accessToken
    } catch (error) {
      console.error('Error acquiring token silently:', error)
      throw error
    }
  }, [instance])

  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken()
      setAccessToken(token)
    }

    if (isAuth) {
      fetchToken()
    }
  }, [isAuth, getAccessToken])

  const { data: userData, isLoading } = useGetUser(accessToken)

  useEffect(() => {
    if (context && userData) {
      context.setUser(userData.user)
    }
  }, [userData, context])

  const isLogged = !!userData?.user

  return { user: context?.user, isLoading, getAccessToken, isLogged }
}
