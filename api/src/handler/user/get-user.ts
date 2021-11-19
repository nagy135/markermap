import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';
import UserEntity from '@entity/user.entity';

export default async (id: string): Promise<UserEntity> => {
  const userRepository = getCustomRepository(UserRepository);

  return userRepository.getById(id);
};
