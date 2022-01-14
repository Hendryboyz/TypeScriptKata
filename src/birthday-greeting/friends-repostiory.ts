export type Friend = { firstName: string; birthday: string; email: string };

export interface IFriendsRepository {
  getAll(): Friend[];
}
