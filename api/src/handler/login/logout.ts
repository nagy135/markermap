import { TRequestLogout } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';

export default async (data: TRequestLogout): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);

  await userRepository.logout(data);
};
