import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Controller('estudantes')
export class EstudantesController {
  constructor(private readonly estudantesService: EstudantesService) {}

  @Post()
  create(@Body() createEstudanteDto: CreateEstudanteDto) {
    return this.estudantesService.create(createEstudanteDto);
  }

  @Get()
  findAll() {
    return this.estudantesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const estudantes = await this.estudantesService.findOne(+id);
    if(!estudantes) throw new NotFoundException();
    return estudantes;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEstudanteDto: UpdateEstudanteDto) {
    const estudantes = await this.estudantesService.update(+id, updateEstudanteDto);
    if(!estudantes) throw new NotFoundException();
    return estudantes;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const estudantes = await this.estudantesService.remove(+id);
    if(!estudantes) throw new NotFoundException();
  }
}
