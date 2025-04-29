import { Either, right } from '@/core/either'
import { Driver } from '@/domain/enterprise/entities/driver'
import { DriversRepository } from '../../repositories/drivers-repository'

interface FetchDriversUseCaseRequest {
  page: number
}

type FetchDriversUseCaseResponse = Either<
  null,
  {
    drivers: Driver[]
  }
>

export class FetchDriversUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    page,
  }: FetchDriversUseCaseRequest): Promise<FetchDriversUseCaseResponse> {
    const drivers = await this.driversRepository.findAll({ page })

    return right({
      drivers,
    })
  }
}
