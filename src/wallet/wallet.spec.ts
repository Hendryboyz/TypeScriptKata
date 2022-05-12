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

    it('When wallet contains 1 type of stocks Then return value', () => {
      // arrange
      const wallet: Wallet = new Wallet();
      const stock1: Stock = new Stock(5, StockType.PETROLEUM);
      wallet.add(stock1);
      jest.spyOn(rateProvider, 'rate').mockReturnValue(50);

      // action
      const value: Value = wallet.value(Currency.EUR, rateProvider);

      // assert
      expect(value.currency).toBe(Currency.EUR);
      expect(value.amount).toBe(250);
    });

    it('When wallet contains multiple types of stocks Then return value', () => {
      // arrange
      const wallet: Wallet = new Wallet();
      const stock1: Stock = new Stock(5, StockType.PETROLEUM);
      wallet.add(stock1);
      const stock2: Stock = new Stock(7, StockType.ETF);
      wallet.add(stock2);
      const stock3: Stock = new Stock(9, StockType.BITCOIN);
      wallet.add(stock3);
      jest
        .spyOn(rateProvider, 'rate')
        .mockImplementation((from: StockType, to: Currency) => {
          if (from === StockType.PETROLEUM) {
            return 3.0;
          } else if (from === StockType.BITCOIN) {
            return 5.0;
          } else if (from === StockType.ETF) {
            return 1.2;
          } else {
            return 1;
          }
        });

      // action
      const value: Value = wallet.value(Currency.EUR, rateProvider);

      // assert
      expect(value.currency).toBe(Currency.EUR);
      expect(value.amount).toBe(68.4);
    });
  });
});
