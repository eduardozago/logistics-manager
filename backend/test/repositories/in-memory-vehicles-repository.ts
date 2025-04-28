import { PaginationParams } from '@/core/core/pagination-params'
import { VehiclesRepository } from '@/domain/application/repositories/vehicles-repository'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'

export class InMemoryVehiclesRepository implements VehiclesRepository {
  public items: Vehicle[] = []

  async findById(id: string) {
    const vehicle = this.items.find((item) => item.id.toString() === id)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findByPlate(plate: string) {
    const vehicle = this.items.find((item) => item.plate === plate)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findAll({ page }: PaginationParams) {
    const vehicles = this.items.slice((page - 1) * 10, page * 10)

    return vehicles
  }

  async save(vehicle: Vehicle) {
    const vehicleIndex = this.items.findIndex((item) => vehicle.equals(item))

    this.items[vehicleIndex] = vehicle
  }

  async create(vehicle: Vehicle) {
    this.items.push(vehicle)
  }

  async delete(id: string) {
    const vehicleIndex = this.items.findIndex(
      (item) => item.id.toString() === id,
    )

    if (vehicleIndex !== -1) {
      this.items.splice(vehicleIndex, 1)
    }
  }
}
