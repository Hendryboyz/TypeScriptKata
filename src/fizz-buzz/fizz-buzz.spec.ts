import { FizzBuzz, ResponseConstants } from './fizz-buzz';

describe('FizzBuzz', () => {
  let fizzBuzz: any = null;
  beforeEach(() => {
    fizzBuzz = new FizzBuzz();
  });

  it('Given number is divsible by 3, then return Fizz', () => {
    const response: string = fizzBuzz.response(3);
    expect(response).toMatch(ResponseConstants.FIZZ);
  });

  const divisableBy3: number[] = [3, 6, 9, 12, 18];
  test.each(divisableBy3)(
    'Given %p is divisable by 3, then return Fizz',
    (num: number) => {
      const result = fizzBuzz.response(num);
      expect(result).toMatch(ResponseConstants.FIZZ);
    }
  );
  const divisableBy5: number[] = [5, 10, 20];
  test.each(divisableBy5)(
    'Given %p is divisable by 5, then Return Buzz',
    (num: number) => {
      const result = fizzBuzz.response(num);
      expect(result).toMatch(ResponseConstants.BUZZ);
    }
  );

  //   test('Given number is the common multiple of 3 and 5, then return FizzBuzz');
});
