import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'
import { VehicleType } from '@/domain/enterprise/entities/vehicle-type'
import { Prisma, Vehicle as PrismaVehicle } from 'generated/prisma'

export class PrismaVehiclesMapper {
  static toDomain(raw: PrismaVehicle): Vehicle {
    return Vehicle.create(
      {
        plate: raw.plate,
        model: raw.model,
        type: raw.type as VehicleType,
        year: raw.year,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(vehicle: Vehicle): Prisma.VehicleCreateInput {
    return {
      id: vehicle.id.toString(),
      plate: vehicle.plate,
      model: vehicle.model,
      type: vehicle.type,
      year: vehicle.year,
    }
  }
}
