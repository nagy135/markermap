import { TRequestUploadImage } from '@ctypes/request';
// import { getCustomRepository } from 'typeorm';
// import RecordRepository from '@repository/record.repository';

export default async (
  data: TRequestUploadImage,
  file?: Express.Multer.File
) => {
  console.log('================\n', 'data: ', data, '\n================');
  console.log('================\n', 'FILE: ', file, '\n================');
};
