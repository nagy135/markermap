import { NextFunction, Request, Response } from 'express';

import { RESPONSE_STATUS_OK, STATUS_HTTP_OK } from '@utils/http-codes';
import LoginHandler from '@handler/login';
import { TApplicationError } from '@utils/app-errors';

/**
 * verifies login
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await LoginHandler.login(req.body);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * optional logout (clearing loginToken)
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    await LoginHandler.logout(req.body);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * recover login via loginToken
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const recover = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    await LoginHandler.recover(req.body);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};
