import { TRequestCreateRecord } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import RecordRepository from '@repository/record.repository';

export default async (data: TRequestCreateRecord): Promise<string> => {
  const recordRepository = getCustomRepository(RecordRepository);

  return await recordRepository.make(data);
};
