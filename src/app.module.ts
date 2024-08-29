import { Module } from "@nestjs/common";
import { ExchangeRatesModule } from "./exchange-rates/exchange-rates.module";
import { ConfigModule } from "./database/config.module";
import { RindegastinoModule } from "./rindegastino/rindegastino.module";
import { NumbersModule } from './numbers/numbers.module';

@Module({
  imports: [
    ExchangeRatesModule,
    ConfigModule,
    RindegastinoModule,
    NumbersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
