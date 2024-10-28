import { ObjectValues } from './object-values'

export const STATUS = {
  AVAILABLE: 'AVAILABLE',
  MAINTENCE: 'MAINTENCE',
  UNAVAILABLE: 'UNAVAILABLE'
} as const

export type STATUS = ObjectValues<typeof STATUS>
