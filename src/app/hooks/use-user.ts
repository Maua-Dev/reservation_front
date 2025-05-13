import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { loginRequest } from '../auth/auth-config'
import { useAccessToken, UserService } from '@/services/user-service'

export interface User {
  user_id: string
  name: string
  ra: string
  email: string
  role: string
  confirm_user: boolean
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const { user, setUser } = context
  const isAuth = useIsAuthenticated()

  const { getAccessToken } = useAccessToken()

  async function getUser() {
    try {
      const accessToken = await getAccessToken()
      const userData = await UserService.getUser(accessToken)
      console.log('User data getUser:', userData)
      setUser(userData.user)
      return userData
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  return { user, getUser, isAuth }
}
