import { TRequestGetUsers } from '@ctypes/request';
import { getUsersNewestFirst } from 'supertokens-node';
import { getUserCount } from 'supertokens-node';

export default async (
  _data: TRequestGetUsers
): Promise<{ email: string }[]> => {
  const count = await getUserCount();
  if (!count) return [];
  const usersResponse = await getUsersNewestFirst({
    limit: count,
  });
  const users = usersResponse.users;
  return users.map((e) => {
    return {
      email: e.user.email,
      id: e.user.id,
    };
  });
};
