import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { makeVehicle } from 'test/factories/make-vehicle'
import { UpdateVehicleUseCase } from './update-vehicle.use-case'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: UpdateVehicleUseCase

describe('Update Vehicle', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new UpdateVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to update a vehicle', async () => {
    const vehicle = makeVehicle({
      model: 'Volvo FH',
    })

    inMemoryVehiclesRepository.create(vehicle)

    vehicle.model = 'Volvo FH 540'

    const result = await sut.execute({
      vehicleId: vehicle.id.toString(),
      plate: vehicle.plate,
      model: vehicle.model,
      type: vehicle.type,
      year: vehicle.year,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.vehicle.model).toEqual('Volvo FH 540')
  })
})
