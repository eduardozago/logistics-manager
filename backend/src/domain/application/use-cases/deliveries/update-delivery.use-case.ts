import { Either, left, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveriesRepository } from '../../repositories/deliveries-repository'
import { DeliveryStatusMapper } from '../../mappers/delivery-status-mapper'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface UpdateDeliveryUseCaseRequest {
  deliveryId: string
  origin: string
  destination: string
  status: string
}

type UpdateDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class UpdateDeliveryUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({
    deliveryId,
    origin,
    destination,
    status,
  }: UpdateDeliveryUseCaseRequest): Promise<UpdateDeliveryUseCaseResponse> {
    const delivery = await this.deliveriesRepository.findById(deliveryId)

    if (!delivery) {
      return left(new ResourceNotFoundError())
    }

    const domainStatus = DeliveryStatusMapper.toDomain(status)

    delivery.origin = origin
    delivery.destination = destination
    delivery.status = domainStatus

    await this.deliveriesRepository.save(delivery)

    return right({
      delivery,
    })
  }
}
