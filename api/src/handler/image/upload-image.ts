import { TRequestUploadImage } from '@ctypes/request';
import { Request, Response } from 'express';
// import { getCustomRepository } from 'typeorm';
// import RecordRepository from '@repository/record.repository';

export default async (
  data: TRequestUploadImage,
  req: Request,
  res: Response
) => {
  console.log('================\n', 'data: ', data, '\n================');
  console.log(
    '================\n',
    'FILEs: ',
    req.files.image,
    '\n================'
  );
};
