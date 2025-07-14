import { createContext, ReactNode, useState } from 'react'
import { User } from '../hooks/use-user'

type UserContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
