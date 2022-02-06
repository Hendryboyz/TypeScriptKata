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

  describe('Given user with 2 friends', () => {
    const genreateFriendList = (): Friend[] => {
      let friends: Friend[] = [];
      friends.push({
        firstName: 'Nick',
        birthday: new Date('1999-04-05'),
        email: 'nick@example.com'
      });
      friends.push({
        firstName: 'Linda',
        birthday: new Date('1999-04-05'),
        email: 'linda@example.com'
      });
      return friends;
    };

    it("when check if today is some friends' birthday then retrieve friends from repository", () => {
      // arrange
      const userId = 'henry.chou';

      // action
      service.congratulate(userId);

      // assert
      expect(friendsRepository.getAll).toBeCalledWith(userId);
    });

    it("when today is some friends' birthday then felicitate via noitify service", () => {
      // arrange
      const userId = 'henry.chou';
      jest.useFakeTimers('modern').setSystemTime(new Date('2020-04-05'));
      jest
        .spyOn(friendsRepository, 'getAll')
        .mockReturnValue(genreateFriendList());

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

  describe('Given user with friends and their birthday in each month', () => {
    const mockDates = [
      {name: 'Rehaan', day: '2021-01-01'},
      {name: 'Ansh', day: '2020-02-01'},
      {name: 'Karam', day: '2020-03-01'},
      {name: 'Beatriz', day: '2020-04-01'},
      {name: 'Joely', day: '2020-05-01'},
      {name: 'Isaac', day: '2020-06-01'},
      {name: 'Stefania', day: '2020-07-01'},
      {name: 'Allan', day: '2020-08-01'},
      {name: 'Bronwyn', day: '2020-09-01'},
      {name: 'Glenn', day: '2020-10-01'},
      {name: 'Niall', day: '2020-11-01'},
      {name: 'Taybah', day: '2020-12-01'},
    ];
    const mockFriendList = (): Friend[] => {
      let friends: Friend[] = [];
      mockDates.forEach((eachFriend) => {
        friends.push({
          firstName: eachFriend.name,
          birthday: new Date(eachFriend.day),
          email: `${eachFriend.name.toLowerCase()}@example.com`,
        });
      });
      return friends;
    }
    it.each(mockDates)(
      "when today($day) is $name's birthday, then congratulate $name",
      ({name, day}) => {
        // arrange
        const userId = 'henry.chou';
        jest.useFakeTimers('modern').setSystemTime(new Date(day));
        jest.spyOn(friendsRepository, 'getAll').mockReturnValue(mockFriendList());

        // action
        service.congratulate(userId);

        // assert
        const regex = new RegExp(`.*${name}$`);
        expect(notificationService.notify).toHaveBeenCalledTimes(1);
        expect(notificationService.notify).toHaveBeenCalledWith(
          expect.stringMatching(regex)
        );
      }
    );
  });
});


