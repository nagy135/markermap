import { getCustomRepository } from 'typeorm';
import RecordRepository from '@repository/record.repository';
import RecordEntity from '@entity/record.entity';

export default async (id: string): Promise<RecordEntity> => {
  const recordRepository = getCustomRepository(RecordRepository);

  return recordRepository.getById(id);
};
