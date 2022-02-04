import { Friend, IFriendsRepository } from './friends-repostiory';
import { INotificationService } from './notification-service';

export class BirthdayService {
  constructor(
    private friendRepository: IFriendsRepository,
    private notificationService: INotificationService
  ) {}

  private isTheSameDate(date1: Date, date2: Date) {
    return date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
    // date.getDay() is used to return the day of the week
  }

  congratulate(userId: string) {
    const firends: Friend[] = this.friendRepository.getAll(userId);
    const today = new Date();
    firends.forEach((eachFriend: Friend) => {
      if (!this.isTheSameDate(today, eachFriend.birthday)) {
        return;
      }
      this.notificationService.notify(eachFriend.firstName);
    });
  }
}
