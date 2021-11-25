import { TRequestLogin } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';

export default async (data: TRequestLogin): Promise<TLoginResponse> => {
  const userRepository = getCustomRepository(UserRepository);

  return await userRepository.login(data);
};
