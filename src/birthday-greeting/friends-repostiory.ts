export type Friend = { firstName: string; birthday: Date; email: string };

export interface IFriendsRepository {
  getAll(userId: string): Friend[];
}
