import { Wallet } from './wallet';
import { StockType, Stock } from './stock';
import RateProvider from './rateprovider';
import { Currency } from './currency';

describe('Wallet', () => {
  let wallet: Wallet;
  beforeEach(() => {
    wallet = new Wallet();
  });

  describe('Given computing the value in EUR', () => {
    it('When a wallet with a stock Then return the value', () => {
      // arrange
      const stock1: Stock = new Stock(5, StockType.PETROLEUM);
      wallet.add(stock1);
      const rateProvider: RateProvider = new RateProvider(
        StockType.PETROLEUM,
        Currency.EUR
      );

      // action
      const value = wallet.computeValue(Currency.EUR, rateProvider);

      // assert
      expect(value).toBeDefined();
      expect(value).not.toBe(0);
    });
  });
});
