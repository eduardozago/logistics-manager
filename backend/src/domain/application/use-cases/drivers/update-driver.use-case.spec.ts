import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { makeDriver } from 'test/factories/make-driver'
import { UpdateDriverUseCase } from './update-driver.use-case'

let inMemoryDriversRepository: InMemoryDriversRepository
let sut: UpdateDriverUseCase

describe('Update Driver', () => {
  beforeEach(() => {
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new UpdateDriverUseCase(inMemoryDriversRepository)
  })

  it('should be able to update a driver', async () => {
    const driver = makeDriver({
      name: 'John Doe',
      vehicleId: null,
    })

    inMemoryDriversRepository.create(driver)

    const driverUpdated = {
      driverId: driver.id.toString(),
      name: 'John Smith Doe',
      license: driver.license,
      vehicleId: 'vehicle-id',
    }

    const result = await sut.execute(driverUpdated)

    expect(result.isRight()).toBe(true)
    expect(result.value?.driver.name).toEqual('John Smith Doe')
    expect(result.value?.driver.vehicleId.toString()).toEqual('vehicle-id')
  })
})
