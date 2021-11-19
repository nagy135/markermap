import { TRequestCreateUser } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';

export default async (data: TRequestCreateUser): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);

  await userRepository.make(data);
};
