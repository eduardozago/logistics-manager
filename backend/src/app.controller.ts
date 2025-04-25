import { Controller, Get } from '@nestjs/common'
import { Public } from './decorators/public.decorator'

@Controller('hello')
export class AppController {
  @Get('public')
  @Public()
  getHello() {
    return 'Hello World'
  }

  @Get('private')
  getHelloPrivate() {
    return 'Hello World - Private'
  }
}
