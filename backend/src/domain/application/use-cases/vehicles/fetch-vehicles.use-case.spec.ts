import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { makeVehicle } from 'test/factories/make-vehicle'
import { FetchVehiclesUseCase } from './fetch-vehicles.use-case'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: FetchVehiclesUseCase

describe('Fetch Vehicles', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new FetchVehiclesUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to fetch vehicles', async () => {
    const vehicle1 = makeVehicle()
    const vehicle2 = makeVehicle()

    inMemoryVehiclesRepository.create(vehicle1)
    inMemoryVehiclesRepository.create(vehicle2)

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.vehicles).toHaveLength(2)
  })

  it('should be able to fetch paginated vehicles', async () => {
    for (let i = 0; i < 12; i++) {
      const vehicle = makeVehicle()

      inMemoryVehiclesRepository.create(vehicle)
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.vehicles).toHaveLength(2)
  })
})
