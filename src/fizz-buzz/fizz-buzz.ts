export const ResponseConstants = {
  FIZZ: 'Fizz',
  BUZZ: 'Buzz'
};

export class FizzBuzz {
  response(num: number): string {
    if (num % 3 === 0 && num % 5 === 0) {
      return ResponseConstants.FIZZ + ResponseConstants.BUZZ;
    } else if (num % 3 === 0) {
      return ResponseConstants.FIZZ;
    } else if (num % 5 === 0) {
      return ResponseConstants.BUZZ;
    } else {
      return this.matchString(num);
    }
  }

  private matchString(num: number): string {
    let numString = num.toString();
    if (numString.includes('3')) {
      return ResponseConstants.FIZZ;
    } else if (numString.includes('5')) {
      return ResponseConstants.BUZZ;
    } else {
      return numString;
    }
  }
}
