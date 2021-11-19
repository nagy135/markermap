import { TRequestGetUsers } from '@ctypes/request';
import { TPaginationResult, TPaginationOptions } from '@ctypes/other';
import { getCustomRepository } from 'typeorm';
import UserEntity from '@entity/user.entity';
import UserRepository from '@repository/user.repository';
import { getPaginatedResult } from '@utils/common';

export default async (
  data: TRequestGetUsers
): Promise<TPaginationResult<UserEntity>> => {
  const userRepository = getCustomRepository(UserRepository);

  // FETCHING RESULTS

  const paginationOptions = {
    sortBy: 'createdAt',
  };

  const paginatedResult = await getPaginatedResult(
    userRepository.createQueryBuilder('self'),
    paginationOptions as TPaginationOptions,
    data
  );

  return paginatedResult;
};
