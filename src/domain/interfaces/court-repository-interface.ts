import { Court } from '../entities/court'

export interface CourtRepositoryInterface {
  getCourt(number: number): Promise<Court>
  getAllCourts(): Promise<Court[]>
  createCourt(court: Court): Promise<Court>
  updateCourt(court: Court): Promise<Court>
  deleteCourt(id: number): Promise<Court>
}
