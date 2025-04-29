import { DeliveryStatus } from '@/domain/enterprise/entities/delivery-status'

export class DeliveryStatusMapper {
  static toDomain(type: string): DeliveryStatus {
    if (!Object.values(DeliveryStatus).includes(type as DeliveryStatus)) {
      throw new Error(`Invalid delivery type: ${type}`)
    }

    return type as DeliveryStatus
  }

  static toExternal(type: DeliveryStatus): string {
    return type
  }
}
