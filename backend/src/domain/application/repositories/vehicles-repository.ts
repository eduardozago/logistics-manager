import { PaginationParams } from '@/core/core/pagination-params'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'

export abstract class VehiclesRepository {
  abstract findById(id: string): Promise<Vehicle | null>
  abstract findByPlate(plate: string): Promise<Vehicle | null>
  abstract findAll(params: PaginationParams): Promise<Vehicle[]>
  abstract save(vehicle: Vehicle): Promise<void>
  abstract create(vehicle: Vehicle): Promise<void>
  abstract delete(id: string): Promise<void>
}