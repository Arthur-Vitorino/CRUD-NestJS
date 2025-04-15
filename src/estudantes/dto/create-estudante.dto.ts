import { IsDateString, IsEmail, IsInt, IsNumber, IsString} from 'class-validator';

export class CreateEstudanteDto {

    @IsString()
    nome: string;

    @IsString()
    matricula: string;

    @IsEmail()
    email: string;

    @IsDateString()
    dt_nascimento: string;

    @IsInt()
    cidade_id: number;
}