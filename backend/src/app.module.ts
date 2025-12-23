import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [PrismaModule, AuthModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
