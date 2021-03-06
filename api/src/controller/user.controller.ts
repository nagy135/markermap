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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await UserHandler.getUsers(req.query);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * return user identified by id
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await UserHandler.getUser(req.params.userId);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * deletes single user
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    await UserHandler.deleteUser(req.params.userId);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};
