import { deleteUser } from 'supertokens-node';

export default async (id: string): Promise<void> => {
  await deleteUser(id);
};
