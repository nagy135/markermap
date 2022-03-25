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
    userId: yup.string().uuid().optional(),
  },
};

export const deleteUserRequest = {
  params: {
    userId: yup.string().uuid().required(),
  },
};
