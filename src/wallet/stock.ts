export enum StockType {
  PETROLEUM,
  BITCOIN
}

export class Stock {
  constructor(public amount: number, public type: StockType) {
    this.amount = amount;
    this.type = type;
  }
}
