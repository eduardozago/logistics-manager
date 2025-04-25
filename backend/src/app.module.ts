import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClerkClientProvider } from './providers/clerk-client.provider'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { ClerkAuthGuard } from './auth/clerk.guard'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
})
export class AppModule {}
