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
        jest.spyOn(rateProvider, 'rate').mockReturnValue(1);
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

    describe('When a wallet with 2 types of stocks', () => {
      describe('When a wallet with a stock', () => {
        beforeEach(() => {
          // arrange
          const stock1: Stock = new Stock(5, StockType.PETROLEUM);
          wallet.add(stock1);
          const stock2: Stock = new Stock(3, StockType.BITCOIN);
          wallet.add(stock2);
        });

        it('Then rate() should be invoked by stock type', () => {
          // action
          wallet.computeValue(Currency.EUR, rateProvider);

          // assert
          expect(rateProvider.rate).toBeCalledWith(
            StockType.PETROLEUM,
            Currency.EUR
          );
          expect(rateProvider.rate).toBeCalledWith(
            StockType.BITCOIN,
            Currency.EUR
          );
        });

        it('Then value should be the summation of amount x rate', () => {
          // arrange
          jest
            .spyOn(rateProvider, 'rate')
            .mockImplementation((from: StockType, to: Currency) => {
              if (from === StockType.PETROLEUM) {
                return 1.2;
              } else {
                return 2;
              }
            });

          // action
          const value = wallet.computeValue(Currency.EUR, rateProvider);

          // assert
          expect(value).toBe(12);
        });
      });
    });
  });
});
