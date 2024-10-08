import { STATUS } from '@/utils/enums/status'
import { Court } from '../entities/court'

export interface CourtRepositoryInterface {
  getCourt(number: number): Promise<Court>
  getAllCourts(): Promise<Court[]>
  createCourt(
    number: number,
    status: STATUS,
    isField: boolean,
    photo?: string
  ): Promise<Court>
  updateCourt(
    newNumber?: number,
    newStatus?: STATUS,
    newIsField?: boolean,
    newPhoto?: string
  ): Promise<Court>
  deleteCourt(id: number): Promise<Court>
}
