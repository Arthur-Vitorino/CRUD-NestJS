import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';
import { Uf } from './entities/uf.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UfService {
  constructor(
      @InjectRepository(Uf)
      private readonly repository: Repository<Uf>
    ) {}

  create(dto: CreateUfDto) {
    const uf = this.repository.create(dto);
    return this.repository.save(uf);
  }

  findAll() {
    return this.repository.find();
    }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUfDto) {
    const uf = await this.repository.findOneBy({ id });  
    if(!uf) return null;
    this.repository.merge(uf, dto);
    return this.repository.save(uf);
  }

  async remove(id: number) {
    const uf = await this.repository.findOne({
      where: { id },
      relations: ['cidades'],
     });  

    if(!uf) throw new NotFoundException ('UF nao encontrada.');

    if(uf.cidades.length > 0) {
      throw new BadRequestException('Nao é possivel remover: UF possui cidades');
    }
    return this.repository.remove(uf);
  }
}
