import { Router } from 'express';
import { validate } from '@middleware/validation.middleware';

const RouterV1 = Router();

import * as UserController from '@controller/user.controller';
import * as RecordController from '@controller/record.controller';
import * as LoginController from '@controller/login.controller';
import * as ImageController from '@controller/image.controller';

import * as UserRequest from '@requests/validation/user';
import * as RecordRequest from '@requests/validation/record';
import * as LoginRequest from '@requests/validation/login';
import * as ImageRequest from '@requests/validation/image';
import multerUploader from '@utils/multer-uploader';

// login {{{

const LOG_ROUTE_BASE_PATH = '/log';

RouterV1.post(
  `${LOG_ROUTE_BASE_PATH}/in`,
  validate(LoginRequest.loginRequest),
  LoginController.login
);
RouterV1.post(
  `${LOG_ROUTE_BASE_PATH}/recover`,
  validate(LoginRequest.recoverRequest),
  LoginController.recover
);
RouterV1.post(
  `${LOG_ROUTE_BASE_PATH}/out`,
  validate(LoginRequest.logoutRequest),
  LoginController.logout
);

// }}}

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

// images {{{

const IMAGE_ROUTE_BASE_PATH = '/images';

RouterV1.post(
  `${IMAGE_ROUTE_BASE_PATH}`,
  multerUploader.fields([{ name: 'image', maxCount: 1 }]),
  validate(ImageRequest.uploadImageRequest),
  ImageController.uploadImage
);

RouterV1.delete(
  `${IMAGE_ROUTE_BASE_PATH}/:imageId`,
  validate(ImageRequest.deleteImageRequest),
  ImageController.deleteImage
);

// }}}
export default RouterV1;
