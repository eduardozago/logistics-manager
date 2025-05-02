import { PaginationParams } from '@/core/core/pagination-params'
import { VehiclesRepository } from '@/domain/application/repositories/vehicles-repository'
import { Vehicle } from '@/domain/enterprise/entities/vehicle'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaVehiclesMapper } from '../mappers/prisma-vehicles-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaVehiclesRepository implements VehiclesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehiclesMapper.toDomain(vehicle)
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        plate,
      },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehiclesMapper.toDomain(vehicle)
  }

  async findAll({ page }: PaginationParams): Promise<Vehicle[]> {
    const vehiclesList = await this.prisma.vehicle.findMany({
      take: 10,
      skip: (page - 1) * 10,
    })

    const vehicles = vehiclesList.map((vehicle) => {
      return PrismaVehiclesMapper.toDomain(vehicle)
    })

    return vehicles
  }

  async save(vehicle: Vehicle): Promise<void> {
    const prismaVehicle = PrismaVehiclesMapper.toPrisma(vehicle)

    await this.prisma.vehicle.update({
      where: {
        id: vehicle.id.toString(),
      },
      data: prismaVehicle,
    })
  }

  async create(vehicle: Vehicle): Promise<void> {
    const prismaVehicle = PrismaVehiclesMapper.toPrisma(vehicle)

    await this.prisma.vehicle.create({
      data: prismaVehicle,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vehicle.delete({
      where: {
        id,
      },
    })
  }
}
