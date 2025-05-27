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

describe('get all courts in repository mock', () => {
  it('should return all the courts', async () => {
    const courtRepository = new CourtRepositoryMock()
    const courts = await courtRepository.getAllCourts()

    expect(courts).toHaveLength(5)
  })
})

describe('create court in repository mock', () => {
  it('should create a court and return the created court', async () => {
    const courtRepository = new CourtRepositoryMock()
    const lengthBefore = (await courtRepository.getAllCourts()).length
    const court = new Court({
      number: 6,
      status: STATUS.AVAILABLE,
      isField: false,
      photo:
        'https://images.unsplash.com/photo-1542555674-5254b5897f09?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    })

    const response = await courtRepository.createCourt(court)
    const lengthAfter = (await courtRepository.getAllCourts()).length

    expect(lengthBefore).toBe(5)
    expect(lengthAfter).toBe(6)
    expect(response).toStrictEqual(court)

    CourtRepositoryMock.reset()
  })

  it('should throw error because the court already exists', async () => {
    const courtRepository = new CourtRepositoryMock()
    const court = new Court({
      number: 1,
      status: STATUS.AVAILABLE,
      isField: false,
      photo:
        'https://images.unsplash.com/photo-1542555674-5254b5897f09?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    })

    expect(
      async () => await courtRepository.createCourt(court)
    ).rejects.toThrowError('Court already exists')
  })
})

describe('update court in repository mock', () => {
  it('should update a court and return the updated court', async () => {
    const courtRepository = new CourtRepositoryMock()
    const lengthBefore = (await courtRepository.getAllCourts()).length

    const response = await courtRepository.updateCourt(5, {
      newStatus: STATUS.UNAVAILABLE,
      newPhoto: 'https://google.com'
    })

    const newCourt = new Court({
      number: 5,
      status: STATUS.UNAVAILABLE,
      isField: false,
      photo: 'https://google.com'
    })

    const lengthAfter = (await courtRepository.getAllCourts()).length

    expect(lengthBefore).toBe(5)
    expect(lengthAfter).toBe(5)
    expect(response).toStrictEqual(newCourt)

    CourtRepositoryMock.reset()
  })

  it('should throw error because the court does not exist', async () => {
    const courtRepository = new CourtRepositoryMock()

    expect(
      async () =>
        await courtRepository.updateCourt(12, {
          newStatus: STATUS.UNAVAILABLE,
          newPhoto: 'https://google.com'
        })
    ).rejects.toThrowError('Court not found')
  })
})

describe('delete court in repository mock', () => {
  it('should delete a court and return the deleted court', async () => {
    const courtRepository = new CourtRepositoryMock()
    const lengthBefore = (await courtRepository.getAllCourts()).length
    const court = await courtRepository.getCourt(3)

    const deletedCourt = await courtRepository.deleteCourt(3)
    const lengthAfter = (await courtRepository.getAllCourts()).length

    expect(lengthBefore).toBe(5)
    expect(lengthAfter).toBe(4)
    expect(deletedCourt).toStrictEqual(court)

    CourtRepositoryMock.reset()
  })

  it('should throw error because the court does not exist', async () => {
    const courtRepository = new CourtRepositoryMock()

    expect(
      async () => await courtRepository.deleteCourt(99)
    ).rejects.toThrowError('Court not found')
  })
})
