import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CidadeService {
  constructor(
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>
  ){}

  async create(dto: CreateCidadeDto) {
    const uf = await this.repository.findOneBy({ id: dto.uf_id})
    if(!uf) throw new NotFoundException ('UF nao encontrada.');

    const cidade = this.repository.create({name: dto.name, uf});
    return this.repository.save(cidade);
  }

  findAll() {
    return this.repository.find();  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCidadeDto) {
    const cidade = await this.repository.findOneBy({ id });  
    if(!cidade) return null;
    this.repository.merge(cidade, dto);
    return this.repository.save(cidade);
  }

  async remove(id: number) {
    const cidade = await this.repository.findOne({
      where: { id },
      relations: ['estudantes'],
     });  

    if(!cidade) throw new NotFoundException ('cidade nao encontrada.');

    if(cidade.estudantes.length > 0 ){
      throw new BadRequestException('Nao é possivel remover: cidade possui estudantes.')
    }

    return this.repository.remove(cidade);
  }
}
