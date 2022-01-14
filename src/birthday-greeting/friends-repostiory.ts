export type Friend = { firstName: string; birthday: string; email: string };

export class FriendsRepository {
  getAll(): Friend[] {
    const oneFriend: Friend = {
      firstName: 'John',
      birthday: '1972/01/01',
      email: 'friend@example.com'
    };
    return [oneFriend];
  }
}
