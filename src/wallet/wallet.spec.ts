import { Wallet } from './wallet';
import { RateProvider } from './rate-provider';
import { Currency, StockType } from './constants';
import { Stock } from './stock';
import { Value } from './value';
import { createMock } from 'ts-auto-mock';

describe('Wallet', () => {
  beforeEach(() => {});

  it('Given users selling the stocks When wallet contains a stock Then check method invoke', () => {
    // arrange
    const wallet: Wallet = new Wallet();
    const stock1: Stock = new Stock(5, StockType.PETROLEUM);
    const rateProvider: RateProvider = createMock<RateProvider>();
    wallet.add(stock1);

    // action
    const value: Value = wallet.value(Currency.EUR, rateProvider);

    // assert
    expect(value).toBeDefined();
    expect(rateProvider.rate).toBeCalledWith(StockType.PETROLEUM, Currency.EUR);
  });

  const stockTypes = [
    StockType.BITCOIN,
    StockType.DOLLAR,
    StockType.ETF,
    StockType.EURO
  ];
  it.each(stockTypes)(
    `Given users selling the stocks When wallet contains type %s stock Then rateProvider invoke with `,
    (stockType: StockType) => {
      // arrange
      const wallet = new Wallet();
      const stock = new Stock(5.0, stockType);
      wallet.add(stock);
      const rateProvider = createMock<RateProvider>();

      // action
      wallet.value(Currency.EUR, rateProvider);

      // assert
      expect(rateProvider.rate).toBeCalledWith(stockType, Currency.EUR);
    }
  );
});
