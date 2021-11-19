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
