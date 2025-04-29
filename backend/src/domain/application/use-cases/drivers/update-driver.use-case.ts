import { Either, left, right } from '@/core/either'
import { Driver } from '@/domain/enterprise/entities/driver'
import { DriversRepository } from '../../repositories/drivers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface UpdateDriverUseCaseRequest {
  driverId: string
  vehicleId?: string
  name: string
  license: string
}

type UpdateDriverUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    driver: Driver
  }
>

export class UpdateDriverUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    driverId,
    vehicleId,
    name,
    license,
  }: UpdateDriverUseCaseRequest): Promise<UpdateDriverUseCaseResponse> {
    const driver = await this.driversRepository.findById(driverId)

    if (!driver) {
      return left(new ResourceNotFoundError())
    }

    driver.vehicleId = vehicleId ? new UniqueEntityId(vehicleId) : null
    driver.name = name
    driver.license = license

    await this.driversRepository.save(driver)

    return right({
      driver,
    })
  }
}
