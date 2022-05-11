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

    // action
    const value: Value = wallet.value(Currency.EUR, rateProvider);

    // assert
    expect(value).toBeDefined();
    expect(rateProvider.rate).toBeCalledWith(StockType.PETROLEUM, Currency.EUR);
  });
});
