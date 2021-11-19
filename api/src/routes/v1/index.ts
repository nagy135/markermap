import { Router } from 'express';

const RouterV1 = Router();

import * as UserController from '@controller/user.controller';

const USER_ROUTE_BASE_PATH = '/users';
RouterV1.get(`${USER_ROUTE_BASE_PATH}`, UserController.getUsers);
RouterV1.get(`${USER_ROUTE_BASE_PATH}/:id`, UserController.getUser);

export default RouterV1;
