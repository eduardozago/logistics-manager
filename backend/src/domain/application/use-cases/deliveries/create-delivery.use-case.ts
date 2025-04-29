import { Either, left, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeliveriesRepository } from '../../repositories/deliveries-repository'
import { DriversRepository } from '../../repositories/drivers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CreateDeliveryUseCaseRequest {
  driverId: string
  origin: string
  destination: string
}

type CreateDeliveryUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    delivery: Delivery
  }
>

export class CreateDeliveryUseCase {
  constructor(
    private deliveriesRepository: DeliveriesRepository,
    private driversRepository: DriversRepository,
  ) {}

  async execute({
    driverId,
    origin,
    destination,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const driver = await this.driversRepository.findById(driverId)

    if (!driver) {
      return left(new ResourceNotFoundError())
    }

    const delivery = Delivery.create({
      driverId: new UniqueEntityId(driverId),
      origin,
      destination,
    })

    await this.deliveriesRepository.create(delivery)

    return right({
      delivery,
    })
  }
}
