import { Friend, IFriendsRepository } from './friends-repostiory';
import { INotificationService } from './notification-service';

export class BirthdayService {
  constructor(
    private friendRepository: IFriendsRepository,
    private notificationService: INotificationService
  ) {}

  congratulate(userId: string) {
    const firends: Friend[] = this.friendRepository.getAll(userId);
    firends.forEach((eachFriend: Friend) => {
      this.notificationService.notify(eachFriend.firstName);
    });
  }
}
