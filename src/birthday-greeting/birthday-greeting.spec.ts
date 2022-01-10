import { BirthdayGreeting } from './birthday-greeting';

describe('Birthday Greeting', () => {
  let greeting: BirthdayGreeting;
  beforeEach(() => {
    greeting = new BirthdayGreeting();
  });

  it('basic', () => {
    expect(greeting).not.toBeNull();
  });
});
