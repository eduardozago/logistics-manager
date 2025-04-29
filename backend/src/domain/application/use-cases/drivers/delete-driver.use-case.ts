import { Either, left, right } from '@/core/either'
import { Driver } from '@/domain/enterprise/entities/driver'
import { DriversRepository } from '../../repositories/drivers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteDriverUseCaseRequest {
  driverId: string
}

type DeleteDriverUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    driver: Driver
  }
>

export class DeleteDriverUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    driverId,
  }: DeleteDriverUseCaseRequest): Promise<DeleteDriverUseCaseResponse> {
    const driver = await this.driversRepository.findById(driverId)

    if (!driver) {
      return left(new ResourceNotFoundError())
    }

    await this.driversRepository.delete(driverId)

    return right({
      driver,
    })
  }
}
