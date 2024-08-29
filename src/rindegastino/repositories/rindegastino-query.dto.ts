import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class RindegastinoQueryDto {

    @ApiProperty({ description: "Id del Rindegastino" })
    @IsString()
    @IsNotEmpty()
    rindegastinoId: string;

    @ApiProperty({ description: "Fecha de nacimiento Rindegastino" })
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    birthdate: Date;
}
