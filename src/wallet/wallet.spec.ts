import { Wallet } from './wallet';
import { StockType, Stock } from './stock';
import RateProvider from './rateprovider';
import { Currency } from './currency';
import { createMock } from 'ts-auto-mock';

describe('Wallet', () => {
  let wallet: Wallet;
  let rateProvider: RateProvider;
  beforeEach(() => {
    wallet = new Wallet();
    rateProvider = createMock<RateProvider>();
  });

  describe('Given computing the value in EUR', () => {
    describe('When a wallet with a stock', () => {
      beforeEach(() => {
        // arrange
        const stock1: Stock = new Stock(5, StockType.PETROLEUM);
        wallet.add(stock1);
      });

      it('Then rate() should be invoked', () => {
        // action
        wallet.computeValue(Currency.EUR, rateProvider);

        // assert
        expect(rateProvider.rate).toBeCalledWith(
          StockType.PETROLEUM,
          Currency.EUR
        );
      });

      it('Then value should be 5', () => {
        // action
        const value = wallet.computeValue(Currency.EUR, rateProvider);

        // assert
        expect(value).toBeDefined();
        expect(value).toBe(5);
      });
    });
  });
});
