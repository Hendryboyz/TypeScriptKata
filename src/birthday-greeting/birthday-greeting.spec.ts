import { BirthdayGreeting } from './birthday-greeting';
import { IFriendsRepository } from './friends-repostiory';
import { createMock } from 'ts-auto-mock';

describe('Birthday Greeting', () => {
  let greeting: BirthdayGreeting;
  let friendsRepository: IFriendsRepository;
  beforeEach(() => {
    friendsRepository = createMock<IFriendsRepository>();
    greeting = new BirthdayGreeting(friendsRepository);
  });

  it('Given friend detail when generate, then return greeting message', () => {
    const firstName = 'henry';
    const result: string = greeting.generate({
      firstName: firstName,
      birthday: '1992/05/24',
      email: 'user@example.com'
    });
    expect(greeting).not.toBeNull();
    expect(result).toMatch(
      `Subject: Happy birthday!\n\nHappy birthday, dear ${firstName}!`
    );
  });

  it('Given nothing when send, then getAll() in frendsRepository should be called', () => {
    jest.spyOn(friendsRepository, 'getAll').mockReturnValue([]);
    greeting.send();
    expect(friendsRepository.getAll).toBeCalled();
  });
});
