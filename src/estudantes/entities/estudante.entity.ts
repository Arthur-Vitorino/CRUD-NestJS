import { Cidade } from "src/cidade/entities/cidade.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudantes')
export class Estudante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    matricula: string;

    @Column()
    email: string;

    @Column()
    dt_nascimento: string;

    @ManyToOne(() => Cidade, cidade => cidade.estudantes, { nullable: false, onDelete: 'RESTRICT' })
    cidade: Cidade;
}
