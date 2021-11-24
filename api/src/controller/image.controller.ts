import { NextFunction, Request, Response } from 'express';

import { RESPONSE_STATUS_OK, STATUS_HTTP_OK } from '@utils/http-codes';
import ImageHandler from '@handler/image';
import { TApplicationError } from '@utils/app-errors';

/**
 * uploads new image to existing record
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    await ImageHandler.uploadImage(req.body, req, res);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * uploads new image to existing record
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    await ImageHandler.deleteImage(req.params.imageId);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};
