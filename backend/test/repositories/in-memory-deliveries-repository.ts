import { PaginationParams } from '@/core/core/pagination-params'
import { DeliveriesRepository } from '@/domain/application/repositories/deliveries-repository'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveryStatus } from '@/domain/enterprise/entities/delivery-status'

export class InMemoryDeliveriesRepository implements DeliveriesRepository {
  public items: Delivery[] = []

  async findById(id: string) {
    const delivery = this.items.find((item) => item.id.toString() === id)

    if (!delivery) {
      return null
    }

    return delivery
  }

  async findByStatus(status: DeliveryStatus, { page }: PaginationParams) {
    const deliveriesFiltered = this.items.filter(
      (item) => item.status === status,
    )

    const deliveries = deliveriesFiltered.slice((page - 1) * 10, page * 10)

    return deliveries
  }

  async findAll({ page }: PaginationParams) {
    const deliveries = this.items
      .slice((page - 1) * 10, page * 10)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

    return deliveries
  }

  async save(delivery: Delivery) {
    const deliveryIndex = this.items.findIndex((item) => delivery.equals(item))

    this.items[deliveryIndex] = delivery
  }

  async create(delivery: Delivery) {
    this.items.push(delivery)
  }

  async delete(id: string) {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id.toString() === id,
    )

    if (deliveryIndex !== -1) {
      this.items.splice(deliveryIndex, 1)
    }
  }
}
