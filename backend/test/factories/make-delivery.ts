import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Delivery, DeliveryProps } from '@/domain/enterprise/entities/delivery'
import { DeliveryStatus } from '@/domain/enterprise/entities/delivery-status'
import { faker } from '@faker-js/faker'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityId,
) {
  const delivery = Delivery.create(
    {
      driverId: new UniqueEntityId(),
      origin: faker.location.city(),
      destination: faker.location.city(),
      status: DeliveryStatus.PENDING,
      ...override,
    },
    id,
  )

  return delivery
}
