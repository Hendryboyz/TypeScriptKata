import { Wallet } from './wallet';

describe('Wallet', () => {
  let wallet: Wallet;
  beforeEach(() => {
    wallet = new Wallet();
  });

  describe('Given computing the value in EUR', () => {
    it('When a wallet with a stock Then return the value', () => {
      // arrange
      Stock stock1 = new Stock(5, StockType.PETROLEUM);
      wallet.add(stock1)
      RateProvider rateProvider = new RateProvider(StockType.PETROLEUM, Currency.EUR);
      // action
      const value = wallet.computeValue(Currency.EUR, rateProvider);
      // assert
      expect(value).not.toBe(0);
    });
  });
});
