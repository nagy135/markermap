import { TRequestRecover } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';

export default async (data: TRequestRecover): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);

  await userRepository.recovery(data);
};
