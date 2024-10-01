import { Court } from '@/domain/entities/court'
import { CourtRepositoryMock } from '@/infrastructure/repositories/mock/court-repository-mock'
import { STATUS } from '@/utils/enums/status'
import { expect, it, describe } from 'vitest'

describe('get court in court repository mock', () => {
  it('should return a court', async () => {
    const courtRepository = new CourtRepositoryMock()
    const court = await courtRepository.getCourt(1)

    expect(court.number).toBe(1)
    expect(court.status).toBe(STATUS.AVAILABLE)
    expect(court.isField).toBe(false)
    expect(court.photo).toBe(
      'https://images.unsplash.com/photo-1542555674-5254b5897f09?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    )
    expect(court).toBeInstanceOf(Court)
  })

  it('should throw error because the court does not exist', async () => {
    const courtRepository = new CourtRepositoryMock()

    expect(async () => await courtRepository.getCourt(99)).rejects.toThrowError(
      'Court not found'
    )
  })
})
