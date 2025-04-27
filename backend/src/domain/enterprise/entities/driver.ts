import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface DriverProps {
  vehicleId: string
  name: string
  license: string
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export class Driver extends Entity<DriverProps> {
  get vehicleId(): string {
    return this.props.vehicleId
  }

  get name(): string {
    return this.props.name
  }

  get license(): string {
    return this.props.license
  }

  static create(props: DriverProps, id?: UniqueEntityId) {
    const driver = new Driver(props, id)

    return driver
  }
}
