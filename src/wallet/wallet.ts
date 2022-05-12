import { Currency, StockType } from './constants';
import { RateProvider } from './rate-provider';
import { Stock } from './stock';
import { Value } from './value';

export class Wallet {
  stocks: Stock[] = [];

  add(stock: Stock) {
    if (stock.amount <= 0) {
      throw new RangeError(`Stock amount: ${stock.amount} must large than 0.`);
    }
    this.stocks.push(stock);
  }

  value(currency: Currency, rateProvider: RateProvider): Value {
    const amount: number = this.stocks.reduce<number>((sum, eachStock) => {
      return (
        sum + eachStock.amount * rateProvider.rate(eachStock.type, currency)
      );
    }, 0);
    return new Value(amount, currency);
  }
}
