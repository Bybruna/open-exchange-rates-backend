import { Injectable } from "@nestjs/common";
import { OpenExchangeRatesService } from "src/shared/open-exchange-rates-api/open-exchange-rates.service";
import { ConvertCurrencyDto } from "./dto/convert-currency.dto";
import { ServiceResult } from "src/shared/response/service-result";
import { HttpStatusCodes } from "src/shared/response/http-status-codes";

@Injectable()
export class ExchangeRatesService {

    constructor(private readonly _openExchangeRatesService: OpenExchangeRatesService) { }

    async convertCurrency(convertCurrencyDto: ConvertCurrencyDto): Promise<ServiceResult> {
        const from = convertCurrencyDto.from.toUpperCase();
        const to = convertCurrencyDto.to.toUpperCase();
        const { amount, date } = convertCurrencyDto;

        try {
            let exchangeRates;
            if (date) {
                exchangeRates = await this._openExchangeRatesService.getHistoricalExchangeRates(date);
            } else {
                exchangeRates = await this._openExchangeRatesService.getLatestExchangeRates();
            }

            const rates = exchangeRates.data.rates;
            const fromRate = rates[from];
            const toRate = rates[to];

            if (!fromRate) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, `Invalid currency code provided for 'from': ${from}`);
            if (!toRate) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, `Invalid currency code provided for 'to': ${to}`);

            const convertedAmount = (amount / fromRate) * toRate;

            return new ServiceResult(HttpStatusCodes.OK, "Convertion Successful", {
                originalAmount: amount,
                convertedAmount,
                rate: toRate,
                from,
                to,
                date: date || 'latest'
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
