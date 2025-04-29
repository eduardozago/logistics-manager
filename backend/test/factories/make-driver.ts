import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Driver, DriverProps } from '@/domain/enterprise/entities/driver'
import { faker } from '@faker-js/faker'

export function makeDriver(
  override: Partial<DriverProps> = {},
  id?: UniqueEntityId,
) {
  const driver = Driver.create(
    {
      vehicleId: new UniqueEntityId(),
      name: faker.person.fullName(),
      license: faker.string.numeric(10),
      ...override,
    },
    id,
  )

  return driver
}
