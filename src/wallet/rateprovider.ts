import { Currency } from './currency';
import { StockType } from './stock';

export default class RateProvider {
  constructor() {}
  rate(from: StockType, to: Currency): number {
    return 1;
  }
}
