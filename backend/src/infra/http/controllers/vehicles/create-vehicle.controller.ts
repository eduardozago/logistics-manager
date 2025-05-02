import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { CreateVehicleUseCase } from '@/domain/application/use-cases/vehicles/create-vehicle.use-case'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const createVehicleBodySchema = z.object({
  plate: z.string().min(7).max(8),
  model: z.string(),
  year: z.string().min(2).max(4),
  type: z.string(),
})

type CreateVehicleBodySchema = z.infer<typeof createVehicleBodySchema>

@Controller('/vehicles')
export class CreateVehicleController {
  constructor(private createVehicleUseCase: CreateVehicleUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createVehicleBodySchema))
  async handle(@Body() body: CreateVehicleBodySchema) {
    const { plate, model, year, type } = body

    const result = await this.createVehicleUseCase.execute({
      plate,
      model,
      year,
      type,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
