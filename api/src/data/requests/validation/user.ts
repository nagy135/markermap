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
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
    nickname: yup.string().required(),
    password: yup.string().required(),
  },
};

export const deleteUserRequest = {
  params: {
    userId: yup.string().uuid().required(),
  },
};
