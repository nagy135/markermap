import { TRequestGetRecords } from '@ctypes/request';
import { TPaginationResult, TPaginationOptions } from '@ctypes/other';
import { getCustomRepository } from 'typeorm';
import { getPaginatedResult } from '@utils/common';
import RecordRepository from '@repository/record.repository';
import RecordEntity from '@entity/record.entity';

export default async (
  data: TRequestGetRecords
): Promise<TPaginationResult<RecordEntity>> => {
  const recordRepository = getCustomRepository(RecordRepository);

  const query = recordRepository
    .createQueryBuilder('self')
    .leftJoinAndSelect('self.images', 'images');

  if (data.userId)
    query.where('self.user_id = :userId', { userId: data.userId });

  // FETCHING RESULTS

  const paginationOptions = {
    sortBy: 'createdAt',
  };

  const paginatedResult = await getPaginatedResult(
    query,
    paginationOptions as TPaginationOptions,
    data
  );

  return paginatedResult;
};
