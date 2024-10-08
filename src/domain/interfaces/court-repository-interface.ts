import { STATUS } from '@/utils/enums/status'
import { Court } from '../entities/court'

type updateCourtParams = {
  newStatus?: STATUS
  newPhoto?: string
}

type createCourtParams = {
  number: number
  status: STATUS
  isField: boolean
  photo?: string
}

export interface CourtRepositoryInterface {
  getCourt(number: number): Promise<Court>
  getAllCourts(): Promise<Court[]>
  createCourt({
    number,
    status,
    isField,
    photo
  }: createCourtParams): Promise<Court>
  updateCourt(
    number: number,
    { newStatus, newPhoto }: updateCourtParams
  ): Promise<Court>
  deleteCourt(id: number): Promise<Court>
}
