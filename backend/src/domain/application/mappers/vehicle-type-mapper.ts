import { VehicleType } from '@/domain/enterprise/entities/vehicle-type'

export class VehicleTypeMapper {
  static toDomain(type: string): VehicleType {
    if (!Object.values(VehicleType).includes(type as VehicleType)) {
      throw new Error(`Invalid vehicle type: ${type}`)
    }

    return type as VehicleType
  }

  static toExternal(type: VehicleType): string {
    return type
  }
}
