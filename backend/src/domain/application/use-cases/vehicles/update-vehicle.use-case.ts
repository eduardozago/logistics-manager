import { Either, left, right } from '@/core/either'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'
import { VehiclesRepository } from '../../repositories/vehicles-repository'
import { VehicleTypeMapper } from '../../mappers/vehicle-type-mapper'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface UpdateVehicleUseCaseRequest {
  vehicleId: string
  driverId?: string | null
  plate: string
  model: string
  type: string
  year: string
}

type UpdateVehicleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    vehicle: Vehicle
  }
>

export class UpdateVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    vehicleId,
    driverId,
    plate,
    model,
    type,
    year,
  }: UpdateVehicleUseCaseRequest): Promise<UpdateVehicleUseCaseResponse> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId)

    if (!vehicle) {
      return left(new ResourceNotFoundError())
    }

    const domainType = VehicleTypeMapper.toDomain(type)

    vehicle.plate = plate
    vehicle.model = model
    vehicle.type = domainType
    vehicle.year = year
    vehicle.driverId = driverId ? new UniqueEntityId(driverId) : null

    await this.vehiclesRepository.save(vehicle)

    return right({
      vehicle,
    })
  }
}
