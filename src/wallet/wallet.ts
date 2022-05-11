import { Currency, StockType } from './constants';
import { RateProvider } from './rate-provider';
import { Stock } from './stock';
import { Value } from './value';

export class Wallet {
  add(stock: Stock) {}

  value(currency: Currency, rateProvider: RateProvider): Value {
    rateProvider.rate(StockType.PETROLEUM, Currency.EUR);
    return new Value();
  }
}
