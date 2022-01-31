import { BirthdayService } from './birthday-service';
import { IFriendsRepository, Friend } from './friends-repostiory';
import { INotificationService } from './notification-service';
import { createMock } from 'ts-auto-mock';

describe('Birthday Greeting', () => {
  let service: BirthdayService;
  let friendsRepository: IFriendsRepository;
  let notificationService: INotificationService;

  beforeEach(() => {
    friendsRepository = createMock<IFriendsRepository>();
    notificationService = createMock<INotificationService>();
    service = new BirthdayService(friendsRepository, notificationService);
  });

  describe('Given user id when has some friends', () => {
    const genreateFriendList = (userId: string): Friend[] => {
      let friends: Friend[] = [];
      friends.push({
        firstName: 'Nick',
        birthday: new Date(1999, 3, 4),
        email: 'nick@example.com'
      });
      friends.push({
        firstName: 'Linda',
        birthday: new Date(1999, 4, 5),
        email: 'linda@example.com'
      });
      return friends;
    };

    it('then retrieve friends from repository', () => {
      // arrange
      const userId = 'henry.chou';
      jest
        .spyOn(friendsRepository, 'getAll')
        .mockReturnValue(genreateFriendList(userId));

      // action
      service.congratulate(userId);

      // assert
      expect(friendsRepository.getAll).toBeCalledWith(userId);
    });

    it('then send felicitation meesage to noitify service', () => {
      // arrange
      const userId = 'henry.chou';
      jest
        .spyOn(friendsRepository, 'getAll')
        .mockReturnValue(genreateFriendList(userId));

      // action
      service.congratulate(userId);

      // assert
      expect(notificationService.notify).toBeCalledTimes(2);
      expect(notificationService.notify).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(/.*Nick$/)
      );
      expect(notificationService.notify).toHaveBeenNthCalledWith(
        2,
        expect.stringMatching(/.*Linda$/)
      );
    });
  });
});
