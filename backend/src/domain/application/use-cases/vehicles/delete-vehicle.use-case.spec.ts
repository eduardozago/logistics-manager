import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { makeVehicle } from 'test/factories/make-vehicle'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteVehicleUseCase } from './delete-vehicle.use-case'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: DeleteVehicleUseCase

describe('Fetch Vehicles', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new DeleteVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to delete a vehicle', async () => {
    const vehicle = makeVehicle({}, new UniqueEntityId('vehicle-01'))

    inMemoryVehiclesRepository.create(vehicle)

    const result = await sut.execute({
      vehicleId: 'vehicle-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryVehiclesRepository.items).toHaveLength(0)
  })
})
