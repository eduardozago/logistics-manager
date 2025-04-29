import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { CreateDriverUseCase } from './create-driver.use-case'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { makeDriver } from 'test/factories/make-driver'

let inMemoryDriversRepository: InMemoryDriversRepository
let sut: CreateDriverUseCase

describe('Create Driver', () => {
  beforeEach(() => {
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new CreateDriverUseCase(inMemoryDriversRepository)
  })

  it('should be able to create a driver', async () => {
    const driver = {
      name: 'John Doe',
      license: '1234567890',
    }

    const result = await sut.execute(driver)

    expect(result.isRight()).toBe(true)
    expect(result.value?.driver.license).toEqual('1234567890')
  })

  it('should not be able to create a driver with same license', async () => {
    inMemoryDriversRepository.create(makeDriver({ license: '1234567890' }))

    const driver = makeDriver({
      license: '1234567890',
    })

    const result = await sut.execute({
      name: driver.name,
      license: '1234567890',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
