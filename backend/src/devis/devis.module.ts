import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { DevisService } from './devis.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DevisController],
  providers: [DevisService],
})
export class DevisModule {}
