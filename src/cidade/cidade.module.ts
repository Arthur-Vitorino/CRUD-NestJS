import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { Estudante } from 'src/estudantes/entities/estudante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade, Estudante])],
  controllers: [CidadeController],
  providers: [CidadeService],
})
export class CidadeModule {}
