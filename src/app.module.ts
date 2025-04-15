import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudantesModule } from './estudantes/estudantes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeModule } from './cidade/cidade.module';
import { UfModule } from './uf/uf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EstudantesModule,
    CidadeModule,
    UfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
