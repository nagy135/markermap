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

  // FETCHING RESULTS

  const paginationOptions = {
    sortBy: 'createdAt',
  };

  const paginatedResult = await getPaginatedResult(
    recordRepository.createQueryBuilder('self'),
    paginationOptions as TPaginationOptions,
    data
  );

  return paginatedResult;
};
