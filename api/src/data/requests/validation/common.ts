import * as yup from 'yup';

export const paginationDefaults = {
  pageSize: yup.number().optional(),
  page: yup.number().optional(),
  direction: yup.string().oneOf(['ASC', 'DESC']),
  sortBy: yup.string().oneOf(['createdAt']),
};
