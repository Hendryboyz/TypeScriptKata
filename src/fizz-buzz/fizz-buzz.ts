export const ResponseConstants = {
  FIZZ: 'Fizz',
  BUZZ: 'Buzz'
};

export class FizzBuzz {
  response(num: number): string {
    if (num === 15) {
      return ResponseConstants.FIZZ + ResponseConstants.BUZZ;
    } else if (num % 3 === 0) {
      return ResponseConstants.FIZZ;
    } else if (num % 5 === 0) {
      return ResponseConstants.BUZZ;
    }
    return '';
  }
}
