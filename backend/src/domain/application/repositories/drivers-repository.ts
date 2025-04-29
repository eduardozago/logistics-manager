import { PaginationParams } from '@/core/core/pagination-params'
import { Driver } from '@/domain/enterprise/entities/driver'

export abstract class DriversRepository {
  abstract findById(id: string): Promise<Driver | null>
  abstract findByLicense(license: string): Promise<Driver | null>
  abstract findAll(params: PaginationParams): Promise<Driver[]>
  abstract save(driver: Driver): Promise<void>
  abstract create(driver: Driver): Promise<void>
  abstract delete(id: string): Promise<void>
}
