import { Entity } from '@/core/entities/entity'
import { VehicleType } from './vehicle-type'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface VehicleProps {
  driverId?: UniqueEntityId | null
  plate: string
  model: string
  type: VehicleType
  year: string
}

export class Vehicle extends Entity<VehicleProps> {
  get driverId(): UniqueEntityId | null {
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

  set plate(plate: string) {
    this.props.plate = plate
  }

  set model(model: string) {
    this.props.model = model
  }

  set type(type: VehicleType) {
    this.props.type = type
  }

  set year(year: string) {
    this.props.year = year
  }

  set driverId(driverId: UniqueEntityId | null) {
    this.props.driverId = driverId
  }

  static create(props: VehicleProps, id?: UniqueEntityId) {
    const vehicle = new Vehicle(props, id)

    return vehicle
  }
}
