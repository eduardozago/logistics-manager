import { Either, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveriesRepository } from '../../repositories/deliveries-repository'

interface FetchLastDeliveriesUseCaseRequest {
  page: number
}

type FetchLastDeliveriesUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchLastDeliveriesUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    page,
  }: FetchLastDeliveriesUseCaseRequest): Promise<FetchLastDeliveriesUseCaseResponse> {
    const deliveries = await this.deliveriesRepository.findAll({ page })

    return right({
      deliveries,
    })
  }
}
