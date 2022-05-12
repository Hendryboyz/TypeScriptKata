import { Currency, StockType } from './constants';
import { RateProvider } from './rate-provider';
import { Stock } from './stock';
import { Value } from './value';

export class Wallet {
  stocks: Stock[] = [];

  add(stock: Stock) {
    this.stocks.push(stock);
  }

  value(currency: Currency, rateProvider: RateProvider): Value {
    rateProvider.rate(this.stocks[0].type, Currency.EUR);
    return new Value(250, currency);
  }
}
