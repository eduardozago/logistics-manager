import { PaginationParams } from '@/core/core/pagination-params'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveryStatus } from '@/domain/enterprise/entities/delivery-status'

export abstract class DeliveriesRepository {
  abstract findById(id: string): Promise<Delivery | null>
  abstract findByStatus(
    status: DeliveryStatus,
    params: PaginationParams,
  ): Promise<Delivery[]>
  abstract findAll(params: PaginationParams): Promise<Delivery[]>
  abstract save(delivery: Delivery): Promise<void>
  abstract create(delivery: Delivery): Promise<void>
  abstract delete(id: string): Promise<void>
}
