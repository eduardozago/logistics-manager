import { InMemoryDeliveriesRepository } from 'test/repositories/in-memory-deliveries-repository'
import { makeDelivery } from 'test/factories/make-delivery'
import { FetchLastDeliveriesUseCase } from './fetch-last-deliveries.use-case'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let sut: FetchLastDeliveriesUseCase

describe('Fetch Deliveries', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    sut = new FetchLastDeliveriesUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able to fetch deliveries', async () => {
    const delivery1 = makeDelivery()
    const delivery2 = makeDelivery()

    inMemoryDeliveriesRepository.create(delivery1)
    inMemoryDeliveriesRepository.create(delivery2)

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })

  it('should be able to fetch paginated deliveries', async () => {
    for (let i = 0; i < 12; i++) {
      const delivery = makeDelivery()

      inMemoryDeliveriesRepository.create(delivery)
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deliveries).toHaveLength(2)
  })
})
