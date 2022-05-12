import { Currency } from './constants';

export class Value {
  constructor(public amount: number, public currency: Currency) {}
}
