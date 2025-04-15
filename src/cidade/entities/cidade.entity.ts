import { Estudante } from "src/estudantes/entities/estudante.entity";
import { Uf } from "src/uf/entities/uf.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cidades')
export class Cidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Uf, uf => uf.cidades, { nullable: false, onDelete: 'RESTRICT'})
    uf: Uf;

    @OneToMany(() => Estudante, estudante => estudante.cidade)
    estudantes: Estudante[];
}