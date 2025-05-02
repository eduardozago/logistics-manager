import { Either, left, right } from '@/core/either'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'
import { VehiclesRepository } from '../../repositories/vehicles-repository'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { VehicleTypeMapper } from '../../mappers/vehicle-type-mapper'
import { Injectable } from '@nestjs/common'

interface CreateVehicleUseCaseRequest {
  plate: string
  model: string
  type: string
  year: string
}

type CreateVehicleUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    vehicle: Vehicle
  }
>

@Injectable()
export class CreateVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    plate,
    model,
    type,
    year,
  }: CreateVehicleUseCaseRequest): Promise<CreateVehicleUseCaseResponse> {
    const vehicleAlreadyExists =
      await this.vehiclesRepository.findByPlate(plate)

    if (vehicleAlreadyExists) {
      return left(new ResourceAlreadyExistsError())
    }

    const domainType = VehicleTypeMapper.toDomain(type)

    const vehicle = Vehicle.create({
      plate,
      model,
      type: domainType,
      year,
    })

    await this.vehiclesRepository.create(vehicle)

    return right({
      vehicle,
    })
  }
}
