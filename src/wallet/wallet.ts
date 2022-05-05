import { Currency } from './currency';
import rateprovider from './rateprovider';
import { Stock, StockType } from './stock';

export class Wallet {
  constructor() {}
  add(stock: Stock) {}
  computeValue(EUR: Currency, rateProvider: rateprovider): number {
    rateProvider.rate(StockType.PETROLEUM, Currency.EUR);
    return 5;
  }
}
