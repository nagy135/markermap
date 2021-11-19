import { getCustomRepository } from 'typeorm';
import RecordRepository from '@repository/record.repository';

export default async (id: string): Promise<void> => {
  const recordRepository = getCustomRepository(RecordRepository);

  await recordRepository.deleteById(id);
};
