import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClerkClientProvider } from './providers/clerk-client.provider'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [ClerkClientProvider],
})
export class AppModule {}
