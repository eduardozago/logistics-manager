import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteDeliveryUseCase } from './delete-delivery.use-case'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: DeleteDeliveryUseCase

describe('Fetch Deliveries', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new DeleteDeliveryUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to delete a delivery', async () => {
    const delivery = makeDelivery({}, new UniqueEntityId('delivery-01'))

    inMemoryDeliveriesRepository.create(delivery)

    const result = await sut.execute({
      deliveryId: 'delivery-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveriesRepository.items).toHaveLength(0)
  })
})
