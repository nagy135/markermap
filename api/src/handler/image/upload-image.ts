import { TRequestUploadImage } from '@ctypes/request';
import { getCustomRepository } from 'typeorm';
import ImageRepository from '@repository/image.repository';

export default async (
  data: TRequestUploadImage,
  file?: Express.Multer.File
): Promise<void> => {
  const imageRepository = getCustomRepository(ImageRepository);

  if (file)
    await imageRepository.make(file.originalname, file.filename, data.recordId);
};
