import { Currency } from './currency';
import rateprovider from './rateprovider';
import { Stock } from './stock';

export class Wallet {
  constructor() {}
  add(stock: Stock) {}
  computeValue(EUR: Currency, rateProvider: rateprovider): number {
    return 1;
  }
}
