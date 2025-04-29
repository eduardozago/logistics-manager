import { Either, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveriesRepository } from '../../repositories/deliveries-repository'
import { DeliveryStatusMapper } from '../../mappers/delivery-status-mapper'

interface FetchDeliveriesByStatusUseCaseRequest {
  status: string
  page: number
}

type FetchDeliveriesByStatusUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchDeliveriesByStatusUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    status,
    page,
  }: FetchDeliveriesByStatusUseCaseRequest): Promise<FetchDeliveriesByStatusUseCaseResponse> {
    const domainStatus = DeliveryStatusMapper.toDomain(status)

    const deliveries = await this.deliveriesRepository.findByStatus(
      domainStatus,
      { page },
    )

    return right({
      deliveries,
    })
  }
}
