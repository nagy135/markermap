import * as yup from 'yup';
import { paginationDefaults } from './common';

export const getRecordRequest = {
  params: {
    recordId: yup.string().uuid().required(),
  },
};

export const getRecordsRequest = {
  query: {
    ...paginationDefaults,
  },
};
