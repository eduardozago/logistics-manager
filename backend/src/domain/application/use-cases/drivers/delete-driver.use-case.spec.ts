import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { makeDriver } from 'test/factories/make-driver'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteDriverUseCase } from './delete-driver.use-case'

let inMemoryDriversRepository: InMemoryDriversRepository
let sut: DeleteDriverUseCase

describe('Fetch Drivers', () => {
  beforeEach(() => {
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new DeleteDriverUseCase(inMemoryDriversRepository)
  })

  it('should be able to delete a driver', async () => {
    const driver = makeDriver({}, new UniqueEntityId('driver-01'))

    inMemoryDriversRepository.create(driver)

    const result = await sut.execute({
      driverId: 'driver-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDriversRepository.items).toHaveLength(0)
  })
})
