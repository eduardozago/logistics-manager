import { Either, left, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveriesRepository } from '../../repositories/deliveries-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteDeliveryUseCaseRequest {
  deliveryId: string
}

type DeleteDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class DeleteDeliveryUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
  }: DeleteDeliveryUseCaseRequest): Promise<DeleteDeliveryUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    await this.deliveriesRepository.delete(deliveryId)

    return right({
      delivery,
    })
  }
}
