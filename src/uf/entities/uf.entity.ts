import { Cidade } from "src/cidade/entities/cidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('UFs')
export class Uf {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sigla: string;

    @OneToMany(() => Cidade, cidade => cidade.uf)
    cidades: Cidade[];
}
