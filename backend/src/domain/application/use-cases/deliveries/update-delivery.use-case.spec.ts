import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { UpdateDeliveryUseCase } from './update-delivery.use-case'
import { DeliveryStatus } from '@/domain/enterprise/entities/delivery-status'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: UpdateDeliveryUseCase

describe('Update Delivery', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new UpdateDeliveryUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to update a delivery', async () => {
    const delivery = makeDelivery({
      status: DeliveryStatus.PENDING,
    })

    inMemoryDeliveriesRepository.create(delivery)

    delivery.status = DeliveryStatus.IN_TRANSIT

    const result = await sut.execute({
      deliveryId: delivery.id.toString(),
      origin: delivery.origin,
      destination: delivery.destination,
      status: delivery.status,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.delivery.status).toEqual(DeliveryStatus.IN_TRANSIT)
  })
})
