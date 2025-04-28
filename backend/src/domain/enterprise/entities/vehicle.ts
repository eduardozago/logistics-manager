import { Entity } from '@/core/entities/entity'
import { VehicleType } from './vehicle-type'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface VehicleProps {
  driverId?: string | null
  plate: string
  model: string
  type: VehicleType
  year: string
}

export class Vehicle extends Entity<VehicleProps> {
  get driverId(): string | null {
    return this.props.driverId ?? null
  }

  get plate(): string {
    return this.props.plate
  }

  get model(): string {
    return this.props.model
  }

  get type(): VehicleType {
    return this.props.type
  }

  get year(): string {
    return this.props.year
  }

  static create(props: VehicleProps, id?: UniqueEntityId) {
    const vehicle = new Vehicle(props, id)

    return vehicle
  }
}
