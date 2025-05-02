import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClerkClientProvider } from './providers/clerk-client.provider'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { ClerkAuthGuard } from './auth/clerk.guard'
import { HttpModule } from './http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
})
export class AppModule {}
