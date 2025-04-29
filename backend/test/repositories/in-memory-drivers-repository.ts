import { PaginationParams } from '@/core/core/pagination-params'
import { DriversRepository } from '@/domain/application/repositories/drivers-repository'
import { Driver } from '@/domain/enterprise/entities/driver'

export class InMemoryDriversRepository implements DriversRepository {
  public items: Driver[] = []

  async findById(id: string) {
    const driver = this.items.find((item) => item.id.toString() === id)

    if (!driver) {
      return null
    }

    return driver
  }

  async findByLicense(license: string) {
    const driver = this.items.find((item) => item.license === license)

    if (!driver) {
      return null
    }

    return driver
  }

  async findAll({ page }: PaginationParams) {
    const drivers = this.items.slice((page - 1) * 10, page * 10)

    return drivers
  }

  async save(driver: Driver) {
    const driverIndex = this.items.findIndex((item) => driver.equals(item))

    this.items[driverIndex] = driver
  }

  async create(driver: Driver) {
    this.items.push(driver)
  }

  async delete(id: string) {
    const driverIndex = this.items.findIndex(
      (item) => item.id.toString() === id,
    )

    if (driverIndex !== -1) {
      this.items.splice(driverIndex, 1)
    }
  }
}
