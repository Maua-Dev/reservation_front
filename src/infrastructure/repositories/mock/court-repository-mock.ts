import { Court } from '@/domain/entities/court'
import { CourtRepositoryInterface } from '@/domain/interfaces/court-repository-interface'
import { STATUS } from '@/utils/enums/status'

export class CourtRepositoryMock implements CourtRepositoryInterface {
  private static _courts: Court[] = [
    new Court({
      number: 1,
      status: STATUS.AVAILABLE,
      isField: false,
      photo:
        'https://images.unsplash.com/photo-1542555674-5254b5897f09?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }),
    new Court({
      number: 2,
      status: STATUS.AVAILABLE,
      isField: false,
      photo:
        'https://images.unsplash.com/photo-1532639749600-6ab0dfd739d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnQlMjBjb3VydHxlbnwwfHwwfHx8MA%3D%3D'
    }),
    new Court({
      number: 3,
      status: STATUS.UNAVAILABLE,
      isField: false,
      photo:
        'https://plus.unsplash.com/premium_photo-1667296787659-aacfba2e1e5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnQlMjBjb3VydHxlbnwwfHwwfHx8MA%3D%3D'
    }),
    new Court({
      number: 4,
      status: STATUS.MAINTENCE,
      isField: true
    }),
    new Court({
      number: 5,
      status: STATUS.AVAILABLE,
      isField: false,
      photo:
        'https://images.unsplash.com/photo-1484634749340-ada5df46442b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvdXJ0fGVufDB8fDB8fHww'
    })
  ]

  async getCourt(number: number): Promise<Court> {
    const courtIndex = CourtRepositoryMock._courts.findIndex(
      (court) => court.number === number
    )

    if (courtIndex === -1) {
      throw new Error('Court not found')
    }

    return CourtRepositoryMock._courts[courtIndex]
  }
  async getAllCourts(): Promise<Court[]> {
    throw new Error('Method not implemented.')
  }
  async createCourt(court: Court): Promise<Court> {
    throw new Error('Method not implemented.')
  }
  async updateCourt(court: Court): Promise<Court> {
    throw new Error('Method not implemented.')
  }
  async deleteCourt(id: number): Promise<Court> {
    throw new Error('Method not implemented.')
  }
}
