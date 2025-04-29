import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { CreateDeliveryUseCase } from './create-delivery.use-case'
import { InMemoryDriversRepository } from 'test/repositories/in-memory-drivers-repository'
import { makeDriver } from 'test/factories/make-driver'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeDelivery } from 'test/factories/make-delivery'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let inMemoryDriversRepository: InMemoryDriversRepository
let sut: CreateDeliveryUseCase

describe('Create Delivery', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    inMemoryDriversRepository = new InMemoryDriversRepository()
    sut = new CreateDeliveryUseCase(
      inMemoryDeliveriesRepository,
      inMemoryDriversRepository,
    )
  })

  it('should be able to create a delivery', async () => {
    const driver = makeDriver({}, new UniqueEntityId('driver-01'))

    inMemoryDriversRepository.create(driver)

    const delivery = {
      driverId: 'driver-01',
      origin: 'New York',
      destination: 'Los Angeles',
    }

    const result = await sut.execute(delivery)

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items).toHaveLength(1)
    expect(result.value?.delivery.driverId.toString()).toEqual('driver-01')
  })

  it('should not be able to create a delivery with invalid driver', async () => {
    inMemoryDeliveriesRepository.create(
      makeDelivery({ driverId: new UniqueEntityId('driver-01') }),
    )

    const delivery = makeDelivery({
      driverId: new UniqueEntityId('driver-02'),
    })

    const result = await sut.execute({
      driverId: 'driver-02',
      origin: delivery.origin,
      destination: delivery.destination,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
