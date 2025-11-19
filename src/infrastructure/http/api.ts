import { environments } from '@/utils/env/enviroments'
import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: environments.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const bookingsApi = axios.create({
  baseURL: environments.bookingsurl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const alertsApi = axios.create({
  baseURL: environments.alertsurl,
  headers: {
    'Content-Type': 'application/json'
  }
})

bookingsApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(`Intercepted error: ${(error as AxiosError).message}`)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(`Intercepted error: ${(error as AxiosError).message}`)
    return Promise.reject(error)
  }
)

alertsApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(`Intercepted error: ${(error as AxiosError).message}`)
    return Promise.reject(error)
  }
)
