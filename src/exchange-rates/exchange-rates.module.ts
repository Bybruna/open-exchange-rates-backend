import { Module } from "@nestjs/common";
import { ExchangeRatesController } from "./exchange-rates.controller";
import { ExchangeRatesService } from "./exchange-rates.service";
import { OpenExchangeRatesService } from "src/shared/open-exchange-rates-api/open-exchange-rates.service";

@Module({
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService, OpenExchangeRatesService],
})
export class ExchangeRatesModule { }
