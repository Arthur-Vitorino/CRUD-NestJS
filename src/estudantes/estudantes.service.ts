import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstudantesService {
  constructor(
    @InjectRepository(Estudante)
    private readonly repository: Repository<Estudante>
  ) {}

  async create(dto: CreateEstudanteDto) {
    const cidade = await this.repository.findOneBy({ id: dto.cidade_id});
    if(!cidade) throw new NotFoundException('Cidade nao encontrada.');

    const estudante = this.repository.create({nome: dto.nome, cidade});
    return this.repository.save(estudante);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateEstudanteDto) {
    const estudante = await this.repository.findOneBy({ id });  
    if(!estudante) return null;
    this.repository.merge(estudante, dto);
    return this.repository.save(estudante);
  }

  async remove(id: number) {
    const estudante = await this.repository.findOneBy({ id });  
    if(!estudante) return null;
    return this.repository.remove(estudante);
  }
}
