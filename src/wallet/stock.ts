import { StockType } from './constants';

export class Stock {
  constructor(private amount: number, private type: StockType) {}
}
