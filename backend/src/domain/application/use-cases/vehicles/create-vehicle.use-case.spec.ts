import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { CreateVehicleUseCase } from './create-vehicle.use-case'
import { makeVehicle } from 'test/factories/make-vehicle'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: CreateVehicleUseCase

describe('Create Vehicle', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new CreateVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to create a vehicle', async () => {
    const vehicle = {
      plate: 'ABC1234',
      model: 'Volvo FH',
      type: 'TRUCK',
      year: '2020',
    }

    const result = await sut.execute(vehicle)

    expect(result.isRight()).toBe(true)
    expect(result.value?.vehicle.plate).toEqual(vehicle.plate)
  })

  it('should not be able to create a vehicle with same plate', async () => {
    inMemoryVehiclesRepository.create(makeVehicle({ plate: 'ABC1234' }))

    const vehicle = makeVehicle({
      plate: 'ABC1234',
    })

    const result = await sut.execute(vehicle)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
