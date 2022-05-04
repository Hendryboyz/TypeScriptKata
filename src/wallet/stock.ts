export enum StockType {
  PETROLEUM
}

export class Stock {
  constructor(private type: StockType, private amount: number) {}
}
