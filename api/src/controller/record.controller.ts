import { NextFunction, Request, Response } from 'express';

import { RESPONSE_STATUS_OK, STATUS_HTTP_OK } from '@utils/http-codes';
import RecordHandler from '@handler/record';
import { TApplicationError } from '@utils/app-errors';

/**
 * lists all records
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await RecordHandler.getRecords(req.query);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * returns record identified by id
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await RecordHandler.getRecord(req.params.recordId);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * create record
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const createRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    await RecordHandler.createRecord(req.body);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};
