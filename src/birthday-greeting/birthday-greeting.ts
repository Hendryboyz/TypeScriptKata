import { Friend, IFriendsRepository } from './friends-repostiory';

export class BirthdayGreeting {
  constructor(private friendRepository: IFriendsRepository) {}

  send() {
    console.log(this.friendRepository.getAll());
  }

  generate(friend: Friend): string {
    return `Subject: Happy birthday!\n\nHappy birthday, dear ${friend.firstName}!`;
  }
}
