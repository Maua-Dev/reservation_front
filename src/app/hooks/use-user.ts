import { useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { useIsAuthenticated } from '@azure/msal-react'
import { UserService } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export interface User {
  userId: string
  name: string
  ra: string
  email: string
  role: string
  confirmUser: boolean
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const { user } = context
  const isAuth = useIsAuthenticated()

  return { user, useUserQuery, isAuth }
}

export const useUserQuery = () => {
  const context = useContext(UserContext)
  const isAuth = useIsAuthenticated()

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const { setUser } = context

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await UserService.getUser()
        localStorage.setItem('user_id', user.userId)
        setUser(user)
        return user
      } catch (error) {
        if (isAuth) {
          toast.error('Error fetching user')
        }
        console.error('Error fetching user:', error)
        return null
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
