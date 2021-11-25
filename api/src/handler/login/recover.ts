import { TRequestRecover } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';

export default async (data: TRequestRecover): Promise<TLoginResponse> => {
  const userRepository = getCustomRepository(UserRepository);

  return await userRepository.recovery(data);
};
