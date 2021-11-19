import { Router } from 'express';
import { validate } from '@middleware/validation.middleware';

const RouterV1 = Router();

import * as UserController from '@controller/user.controller';
import * as RecordController from '@controller/record.controller';

import * as UserRequest from '@requests/validation/user';
import * as RecordRequest from '@requests/validation/record';

// users {{{

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

RouterV1.delete(
  `${USER_ROUTE_BASE_PATH}/:userId`,
  validate(UserRequest.deleteUserRequest),
  UserController.deleteUser
);

// }}}

// records {{{

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

RouterV1.post(
  `${RECORD_ROUTE_BASE_PATH}`,
  validate(RecordRequest.createRecordRequest),
  RecordController.createRecord
);

RouterV1.delete(
  `${RECORD_ROUTE_BASE_PATH}/:recordId`,
  validate(RecordRequest.deleteRecordRequest),
  RecordController.deleteRecord
);

// }}}

export default RouterV1;
