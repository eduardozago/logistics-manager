import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface DriverProps {
  vehicleId?: UniqueEntityId | null
  name: string
  license: string
}

export class Driver extends Entity<DriverProps> {
  get vehicleId(): UniqueEntityId | null {
    return this.props.vehicleId ?? null
  }

  get name(): string {
    return this.props.name
  }

  get license(): string {
    return this.props.license
  }

  set vehicleId(vehicleId: UniqueEntityId | null) {
    this.props.vehicleId = vehicleId
  }

  set name(name: string) {
    this.props.name = name
  }

  set license(license: string) {
    this.props.license = license
  }

  static create(props: DriverProps, id?: UniqueEntityId) {
    const driver = new Driver(props, id)

    return driver
  }
}
