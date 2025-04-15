import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateCidadeDto {

    @IsString()
    name: string;

    @IsInt()
    uf_id: number;
}
