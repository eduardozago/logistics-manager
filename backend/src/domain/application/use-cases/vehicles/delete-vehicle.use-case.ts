import { Either, left, right } from '@/core/either'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'
import { VehiclesRepository } from '../../repositories/vehicles-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteVehicleUseCaseRequest {
  vehicleId: string
}

type DeleteVehicleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    vehicle: Vehicle
  }
>

export class DeleteVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    vehicleId,
  }: DeleteVehicleUseCaseRequest): Promise<DeleteVehicleUseCaseResponse> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId)

    if (!vehicle) {
      return left(new ResourceNotFoundError())
    }

    await this.vehiclesRepository.delete(vehicleId)

    return right({
      vehicle,
    })
  }
}
