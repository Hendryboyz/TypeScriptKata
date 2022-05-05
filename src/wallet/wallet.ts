import { Currency } from './currency';
import RateProvider from './rateprovider';
import { Stock, StockType } from './stock';

export class Wallet {
  stocks: Stock[];

  constructor() {
    this.stocks = [];
  }

  add(stock: Stock) {
    this.stocks.push(stock);
  }

  computeValue(currency: Currency, rateProvider: RateProvider): number {
    return this.stocks.reduce<number>((sum: number, eachStock: Stock) => {
      return (
        sum + eachStock.amount * rateProvider.rate(eachStock.type, currency)
      );
    }, 0);
  }
}
