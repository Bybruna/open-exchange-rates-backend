import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RindegastinoBirthdayDto {

    @ApiProperty({ description: "Id del Rindegastino" })
    @IsString()
    @IsNotEmpty()
    rindegastinoId: string;

    @ApiProperty({ description: "Días para el cumpleaños" })
    @IsNumber()
    @IsNotEmpty()
    daysUntilBirthday: number;
}
