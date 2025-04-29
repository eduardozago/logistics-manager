import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { GetDeliveryByIdUseCase } from './get-delivery-by-id.use-case'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: GetDeliveryByIdUseCase

describe('Get Delivery by Id', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new GetDeliveryByIdUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to get a delivery by id', async () => {
    const delivery = makeDelivery({}, new UniqueEntityId('delivery-01'))

    inMemoryDeliveriesRepository.create(delivery)

    const result = await sut.execute({
      deliveryId: 'delivery-01',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.delivery.id.toString()).toEqual('delivery-01')
  })
})
