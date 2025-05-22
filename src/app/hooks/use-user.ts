import { useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { useIsAuthenticated } from '@azure/msal-react'
import { UserService } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'
import { set } from 'react-hook-form'
import { toast } from 'react-toastify'

export interface User {
  userId: string
  name: string
  ra: string
  email: string
  role: string
  confirmUser: boolean
}

interface getUserResponse {
  user: User
  created: boolean
  message: string
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const { user, setUser } = context
  const isAuth = useIsAuthenticated()

  return { user, useUserQuery, isAuth }
}

export const useUserQuery = () => {
  const context = useContext(UserContext)

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
        if (error instanceof Error) {
          toast.error('Error fetching user: ' + error.message)
          console.error('Error fetching user:', error.message)
          return null
        }
        toast.error('Error fetching user')
        console.error('Error fetching user:', error)
        return null
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5
  })
}
