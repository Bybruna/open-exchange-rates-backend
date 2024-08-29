import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ConvertCurrencyDto {

    @ApiProperty({ description: "Especifica origen de moneda original a convertir" })
    @IsString()
    @IsNotEmpty()
    from: string;

    @ApiProperty({ description: "Especifica moneda final convertida" })
    @IsString()
    @IsNotEmpty()
    to: string;

    @ApiProperty({ description: "Monto a convertir" })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: "Fecha del tipo de cambio" })
    @IsString()
    @IsOptional()
    date?: string;
}
