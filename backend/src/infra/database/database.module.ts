import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { VehiclesRepository } from '@/domain/application/repositories/vehicles-repository'
import { PrismaVehiclesRepository } from './repositories/prisma-vehicles-repository'

@Module({
  providers: [
    PrismaService,
    PrismaVehiclesRepository,
    {
      provide: VehiclesRepository,
      useClass: PrismaVehiclesRepository,
    },
  ],
  exports: [PrismaService, VehiclesRepository, PrismaVehiclesRepository],
})
export class DatabaseModule {}
