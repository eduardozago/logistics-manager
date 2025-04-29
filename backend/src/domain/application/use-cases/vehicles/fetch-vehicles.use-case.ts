import { Either, right } from '@/core/either'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'
import { VehiclesRepository } from '../../repositories/vehicles-repository'

interface FetchVehiclesUseCaseRequest {
  page: number
}

type FetchVehiclesUseCaseResponse = Either<
  null,
  {
    vehicles: Vehicle[]
  }
>

export class FetchVehiclesUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    page,
  }: FetchVehiclesUseCaseRequest): Promise<FetchVehiclesUseCaseResponse> {
    const vehicles = await this.vehiclesRepository.findAll({ page })

    return right({
      vehicles,
    })
  }
}
