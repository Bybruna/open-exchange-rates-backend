import { Controller, Get, HttpException, HttpStatus, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ServiceResult } from "src/shared/response/service-result";
import { ConvertCurrencyDto } from "./dto/convert-currency.dto";
import { ExchangeRatesService } from "./exchange-rates.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("exchange-rates")
@ApiTags("Exchange Rates Controller")
export class ExchangeRatesController {

    constructor(
        private readonly _exchangeRatesService: ExchangeRatesService
    ) { }

    @Get("/convert")
    @ApiResponse({ status: 200, description: "Currency Converted Successfully" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    @ApiOperation({ summary: "Convert a type of currency" })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async convertCurrency(@Query() convertCurrencyDto: ConvertCurrencyDto): Promise<ServiceResult> {
        try {
            const serviceResult = await this._exchangeRatesService.convertCurrency(convertCurrencyDto);
            return serviceResult;
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }
}
