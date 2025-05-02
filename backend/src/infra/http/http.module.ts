import { Module } from '@nestjs/common'
import { CreateVehicleController } from './controllers/vehicles/create-vehicle.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateVehicleUseCase } from '@/domain/application/use-cases/vehicles/create-vehicle.use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateVehicleController],
  providers: [CreateVehicleUseCase],
})
export class HttpModule {}
