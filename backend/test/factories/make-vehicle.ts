import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Vehicle, VehicleProps } from '@/domain/enterprise/entities/vehicle'
import { VehicleType } from '@/domain/enterprise/entities/vehicle-type'
import { faker } from '@faker-js/faker'

export function makeVehicle(
  override: Partial<VehicleProps> = {},
  id?: UniqueEntityId,
) {
  const vehicle = Vehicle.create(
    {
      plate: faker.vehicle.vrm(),
      model: faker.vehicle.model(),
      type: VehicleType.TRUCK,
      year: String(faker.date.past().getFullYear()),
      ...override,
    },
    id,
  )

  return vehicle
}
