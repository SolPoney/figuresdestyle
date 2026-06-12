import { Controller, Post, Body } from '@nestjs/common';
import { DevisService } from './devis.service';

@Controller('devis')
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  @Post()
  async envoyerDevis(@Body() data: any) {
    await this.devisService.envoyerDevisParEmail(data);
    return { message: 'Devis envoyé' };
  }
}
