import * as yup from 'yup';
import { paginationDefaults } from './common';

export const getUserRequest = {
  params: {
    userId: yup.string().uuid().required(),
  },
};

export const getUsersRequest = {
  query: {
    ...paginationDefaults,
  },
};

export const createUserRequest = {
  body: {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
  },
};
