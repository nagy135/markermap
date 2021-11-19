import { NextFunction, Request, Response } from 'express';

import { RESPONSE_STATUS_OK, STATUS_HTTP_OK } from '@utils/http-codes';
import UserHandler from '@handler/user';
import { TApplicationError } from '@utils/app-errors';

/**
 * lists all users
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await UserHandler.getUsers();

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await UserHandler.getUser(req.params.id);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};
