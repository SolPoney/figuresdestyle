import { Controller, Get, Param } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  /** GET /api/modules — liste tous les modules */
  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  /** GET /api/modules/figures/:slug — une figure avec ses questions (avant :id pour éviter le conflit) */
  @Get('figures/:slug')
  findFigure(@Param('slug') slug: string) {
    return this.modulesService.findFigure(slug);
  }

  /** GET /api/modules/:id — détail d'un module avec ses figures + questions */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }
}
