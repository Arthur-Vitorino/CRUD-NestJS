import { IsString } from "class-validator";

export class CreateUfDto {

    @IsString()
    name: string;

    @IsString()
    sigla: string;
}
