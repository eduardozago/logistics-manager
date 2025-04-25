import { User } from '@clerk/backend'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

interface AuthRequest extends Request {
  user: User
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User | undefined => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    return request.user
  },
)
