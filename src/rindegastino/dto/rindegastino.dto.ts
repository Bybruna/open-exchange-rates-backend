import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class RindegastinoDto {

    @ApiProperty({ description: "Nombre Rindegastino" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "Apellido Rindegastino" })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: "Fecha de nacimiento Rindegastino" })
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    birthdate: Date;
}
