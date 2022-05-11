import { StockType } from './constants';

export class Stock {
  constructor(public amount: number, public type: StockType) {}
}
