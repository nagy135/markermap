import * as yup from 'yup';

export const loginRequest = {
  body: {
    nickname: yup.string().required(),
    password: yup.string().required(),
  },
};

export const logoutRequest = {
  body: {
    loginToken: yup.string().required(),
  },
};
