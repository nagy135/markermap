import { Router } from 'express';
import { validate } from '@middleware/validation.middleware';

const RouterV1 = Router();

import * as UserController from '@controller/user.controller';

import * as UserRequest from '@requests/validation/user';

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

export default RouterV1;
