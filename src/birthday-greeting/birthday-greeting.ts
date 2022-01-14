import { Friend, FriendsRepository } from './friends-repostiory';

export class BirthdayGreeting {
  constructor(private friendRepository: FriendsRepository) {}

  send() {
    this.friendRepository.getAll();
  }

  generate(friend: Friend): string {
    return `Subject: Happy birthday!\n\nHappy birthday, dear ${friend.firstName}!`;
  }
}
