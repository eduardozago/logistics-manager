import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DeliveryStatus } from './delivery-status'

export interface DeliveryProps {
  driverId: UniqueEntityId
  origin: string
  destination: string
  status: DeliveryStatus
  createdAt: Date
  updatedAt?: Date | null
}

export class Delivery extends Entity<DeliveryProps> {
  get driverId(): UniqueEntityId {
    return this.props.driverId
  }

  get origin(): string {
    return this.props.origin
  }

  get destination(): string {
    return this.props.destination
  }

  get status(): DeliveryStatus {
    return this.props.status
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt ?? null
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set origin(origin: string) {
    this.props.origin = origin
    this.touch()
  }

  set destination(destination: string) {
    this.props.destination = destination
    this.touch()
  }

  set status(status: DeliveryStatus) {
    this.props.status = status
    this.touch()
  }

  static create(
    props: Optional<DeliveryProps, 'status' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const delivery = new Delivery(
      {
        ...props,
        status: props.status ?? DeliveryStatus.PENDING,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return delivery
  }
}
