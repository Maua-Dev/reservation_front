import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

const apiUrl = 'https://jsonplaceholder.typicode.com'
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useUsersQuery = () => {
  return useQuery({
    retry: 3,
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get<Post[]>('/posts')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return response.data
    }
  })
}

export const usePostByIdQuery = (postId: number) => {
  return useQuery({
    retry: 3,
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await api.get<Post[]>(`/posts${postId}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return response.data
    }
  })
}

export const usePostsQuery = () => {
  return useQuery({
    retry: 3,
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.get<Post[]>('/posts')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return response.data
    }
  })
}

export const useCreatePostMutation = () => {
  const queryClient = new QueryClient()

  return useMutation({
    mutationFn: async (post: Omit<Post, 'id'>) => {
      const response = await api.post<Post>('/posts', post)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
