import { getCustomRepository } from 'typeorm';
import UserRepository from '@repository/user.repository';

export default async (id: string): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);

  return userRepository.deleteById(id);
};
