import { TRequestUploadImage } from '@ctypes/request';
// import { getCustomRepository } from 'typeorm';
// import RecordRepository from '@repository/record.repository';

export default async (data: TRequestUploadImage): Promise<void> => {
  console.log('================\n', 'data: ', data, '\n================');
};
