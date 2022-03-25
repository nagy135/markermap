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
    userId: yup.string().uuid().optional(),
  },
};

export const createRecordRequest = {
  body: {
    name: yup.string().required(),
    lat: yup.string().required(),
    lon: yup.string().required(),
    altitude: yup.number().required(),
    userId: yup.string().uuid().required(),
  },
};

export const deleteRecordRequest = {
  params: {
    recordId: yup.string().uuid().required(),
  },
};
