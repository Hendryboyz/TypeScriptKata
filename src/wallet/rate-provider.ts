import { Currency, StockType } from './constants';

export class RateProvider {
  rate(from: StockType, to: Currency): number {
    throw new Error('Method not implemented.');
  }
}
