import { Module } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { EstudantesController } from './estudantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudante } from './entities/estudante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudante])],
  controllers: [EstudantesController],
  providers: [EstudantesService],
})
export class EstudantesModule {}
