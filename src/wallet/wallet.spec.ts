import { Wallet } from './wallet';
import { RateProvider } from './rate-provider';
import { Currency, StockType } from './constants';
import { Stock } from './stock';
import { Value } from './value';
import { createMock } from 'ts-auto-mock';

describe('Wallet', () => {
  let rateProvider: RateProvider;

  beforeEach(() => {
    rateProvider = createMock<RateProvider>();
  });

  describe('Given users selling the stocks', () => {
    it('When wallet contains a stock Then check method invoke', () => {
      // arrange
      const wallet: Wallet = new Wallet();
      const stock1: Stock = new Stock(5, StockType.PETROLEUM);
      wallet.add(stock1);

      // action
      const value: Value = wallet.value(Currency.EUR, rateProvider);

      // assert
      expect(value).toBeDefined();
      expect(rateProvider.rate).toBeCalledWith(
        StockType.PETROLEUM,
        Currency.EUR
      );
    });

    const stockTypes = [
      StockType.BITCOIN,
      StockType.DOLLAR,
      StockType.ETF,
      StockType.EURO
    ];
    it.each(stockTypes)(
      `When wallet contains type %s stock Then invoke rateProvider with specific type`,
      (stockType: StockType) => {
        // arrange
        const wallet = new Wallet();
        const stock = new Stock(5.0, stockType);
        wallet.add(stock);

        // action
        wallet.value(Currency.EUR, rateProvider);

        // assert
        expect(rateProvider.rate).toBeCalledWith(stockType, Currency.EUR);
      }
    );
  });
});
