import ImageRepository from '@repository/image.repository';
import { getCustomRepository } from 'typeorm';

export default async (id: string): Promise<void> => {
  const recordRepository = getCustomRepository(ImageRepository);

  await recordRepository.deleteById(id);
};
