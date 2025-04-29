import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { makeDriver } from 'test/factories/make-driver'
import { FetchDriversUseCase } from './fetch-drivers.use-case'

let inMemoryDriversRepository: InMemoryDriversRepository
let sut: FetchDriversUseCase

describe('Fetch Drivers', () => {
  beforeEach(() => {
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new FetchDriversUseCase(inMemoryDriversRepository)
  })

  it('should be able to fetch drivers', async () => {
    const driver1 = makeDriver()
    const driver2 = makeDriver()

    inMemoryDriversRepository.create(driver1)
    inMemoryDriversRepository.create(driver2)

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.drivers).toHaveLength(2)
  })

  it('should be able to fetch paginated drivers', async () => {
    for (let i = 0; i < 12; i++) {
      const driver = makeDriver()

      inMemoryDriversRepository.create(driver)
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.drivers).toHaveLength(2)
  })
})
