import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DeliveryStatus } from './delivery-status'

interface DeliveryProps {
  driverId: string
  origin: string
  destination: string
  status: DeliveryStatus
  createdAt: Date
  updatedAt?: Date | null
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export class Delivery extends Entity<DeliveryProps> {
  get driverId(): string {
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

  set status(status: DeliveryStatus) {
    this.props.status = status
    this.touch()
  }

  static create(
    props: Optional<DeliveryProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const delivery = new Delivery(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return delivery
  }
}
