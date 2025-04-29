import { Either, left, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveriesRepository } from '../../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetDeliveryByIdUseCaseRequest {
  deliveryId: string
}

type GetDeliveryByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class GetDeliveryByIdUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: GetDeliveryByIdUseCaseRequest): Promise<GetDeliveryByIdUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    return right({
      delivery,
    })
  }
}
