import { Router } from 'express';
import { validate } from '@middleware/validation.middleware';

const RouterV1 = Router();

import * as UserController from '@controller/user.controller';
import * as RecordController from '@controller/record.controller';

import * as UserRequest from '@requests/validation/user';
import * as RecordRequest from '@requests/validation/record';

const USER_ROUTE_BASE_PATH = '/users';
RouterV1.get(
  `${USER_ROUTE_BASE_PATH}`,
  validate(UserRequest.getUsersRequest),
  UserController.getUsers
);
RouterV1.get(
  `${USER_ROUTE_BASE_PATH}/:userId`,
  validate(UserRequest.getUserRequest),
  UserController.getUser
);

RouterV1.post(
  `${USER_ROUTE_BASE_PATH}`,
  validate(UserRequest.createUserRequest),
  UserController.createUser
);

const RECORD_ROUTE_BASE_PATH = '/records';
RouterV1.get(
  `${RECORD_ROUTE_BASE_PATH}`,
  validate(RecordRequest.getRecordsRequest),
  RecordController.getRecords
);
RouterV1.get(
  `${RECORD_ROUTE_BASE_PATH}/:recordId`,
  validate(RecordRequest.getRecordRequest),
  RecordController.getRecord
);

export default RouterV1;
