import { PalindromeChecker } from './index';
describe('test', () => {
  test('add', async () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('palindrome checker', () => {
  test('"mom" is palindrome', () => {
    const palindromeChecker = new PalindromeChecker();
    expect(palindromeChecker.isPalindrome('mom')).toBeTruthy();
  });
});
