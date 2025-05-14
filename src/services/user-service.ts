// import { CreateUserUseCase } from '@/application/usecase/create-user-usecase'
// import { GetUserListUseCase } from '../application/usecase/get-user-list-usecase'
// import { GetUserUseCase } from '../application/usecase/get-user-usecase'
// import { User } from '../domain/entities/user'
// import { UserServiceInterface } from '../domain/interfaces/user-service-interface'
// import { DeleteUserUseCase } from '@/application/usecase/delete-user-usecase'

// export class UserService implements UserServiceInterface {
//   private getUserListUseCase: GetUserListUseCase
//   private getUserUseCase: GetUserUseCase
//   private createUserUseCase: CreateUserUseCase
//   private deleteUserUseCase: DeleteUserUseCase

//   constructor(
//     getUserListUseCase: GetUserListUseCase = new GetUserListUseCase(),
//     getUserUseCase: GetUserUseCase = new GetUserUseCase(),
//     createUserUseCase: CreateUserUseCase = new CreateUserUseCase(),
//     deleteUserUseCase: DeleteUserUseCase = new DeleteUserUseCase()
//   ) {
//     this.getUserListUseCase = getUserListUseCase
//     this.getUserUseCase = getUserUseCase
//     this.createUserUseCase = createUserUseCase
//     this.deleteUserUseCase = deleteUserUseCase
//   }

//   async listUsers(): Promise<User[]> {
//     return await this.getUserListUseCase.execute()
//   }

//   async getUser(id: number): Promise<User> {
//     return await this.getUserUseCase.execute(id)
//   }

//   async createUser(user: User): Promise<User> {
//     return await this.createUserUseCase.execute(user)
//   }

//   async deleteUser(id: number): Promise<User> {
//     return await this.deleteUserUseCase.execute(id)
//   }
// }

// export const userService = new UserService()

// import { loginRequest } from '@/app/auth/auth-config'
import { User } from '@/app/hooks/use-user'
import { api } from '@/infrastructure/http/api'
// import { useMsal } from '@azure/msal-react'
// import { access } from 'fs'

export interface UserResponse {
  user: {
    user_id: string
    name: string
    ra: string
    email: string
    role: string
    confirm_user: boolean
  }
  created: boolean
  message: string
}

// export const useAccessToken = () => {
//   const { instance } = useMsal()

//   const getAccessToken = async () => {
//     const accounts = instance.getAllAccounts()
//     const accessToken = (
//       await instance.acquireTokenSilent({
//         ...loginRequest,
//         account: accounts[0]
//       })
//     ).accessToken
//     return accessToken
//   }

//   return { getAccessToken }
// }

export const UserService = {
  getUser: async (): Promise<User> => {
    const accessToken = localStorage.getItem('accessToken')
    const response = await api.get<UserResponse>('/auth-user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const data = response.data

    return {
      userId: data.user.user_id,
      name: data.user.name,
      ra: data.user.ra,
      email: data.user.email,
      role: data.user.role,
      confirmUser: data.user.confirm_user
    }
  }
}
