import { Either, left, right } from '@/core/either'
import { Driver } from '@/domain/enterprise/entities/driver'
import { DriversRepository } from '../../repositories/drivers-repository'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateDriverUseCaseRequest {
  vehicleId?: string
  name: string
  license: string
}

type CreateDriverUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    driver: Driver
  }
>

export class CreateDriverUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    vehicleId,
    name,
    license,
  }: CreateDriverUseCaseRequest): Promise<CreateDriverUseCaseResponse> {
    const driverAlreadyExists =
      await this.driversRepository.findByLicense(license)

    if (driverAlreadyExists) {
      return left(new ResourceAlreadyExistsError())
    }

    const driver = Driver.create({
      vehicleId: vehicleId ? new UniqueEntityId(vehicleId) : null,
      name,
      license,
    })

    await this.driversRepository.create(driver)

    return right({
      driver,
    })
  }
}
