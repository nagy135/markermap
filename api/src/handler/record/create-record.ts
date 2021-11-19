import { TRequestCreateRecord } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import RecordRepository from '@repository/record.repository';

export default async (data: TRequestCreateRecord): Promise<void> => {
  const recordRepository = getCustomRepository(RecordRepository);

  await recordRepository.make(data);
};
