import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { FetchDeliveriesByStatusUseCase } from './fetch-deliveries-by-status.use-case'
import { DeliveryStatus } from '@/domain/enterprise/entities/delivery-status'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: FetchDeliveriesByStatusUseCase

describe('Fetch Deliveries', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new FetchDeliveriesByStatusUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to fetch deliveries', async () => {
    const delivery1 = makeDelivery({
      status: DeliveryStatus.PENDING,
    })
    const delivery2 = makeDelivery({
      status: DeliveryStatus.PENDING,
    })

    inMemoryDeliveriesRepository.create(delivery1)
    inMemoryDeliveriesRepository.create(delivery2)

    const result = await sut.execute({ status: 'PENDING', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })

  it('should be able to fetch paginated deliveries', async () => {
    for (let i = 0; i < 12; i++) {
      const delivery = makeDelivery({
        status: DeliveryStatus.IN_TRANSIT,
      })

      inMemoryDeliveriesRepository.create(delivery)
    }

    const result = await sut.execute({ status: 'IN_TRANSIT', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })
})
