import { STAGE } from '../enums/stage'

type Environments = {
  apiUrl: string
  stage: STAGE
  bookingsurl: string
}

export const environments: Environments = {
  apiUrl: import.meta.env.VITE_USER_URL || 'http://localhost:8000',
  stage: (import.meta.env.VITE_STAGE as STAGE) || STAGE.TEST,
  bookingsurl: import.meta.env.VITE_RESERVATION_URL || 'http://localhost:8000'
}
