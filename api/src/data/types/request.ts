import { TPaginationOptions } from './other';

// user {{{
export type TRequestGetUsers = TPaginationOptions;

export type TRequestGetUser = Record<string, string>;

export type TRequestCreateUser = {
  nickname: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
// }}}

// record {{{
export type TRequestGetRecords = TPaginationOptions & {
  userId: string;
};

export type TRequestGetRecord = Record<string, string>;

export type TRequestCreateRecord = {
  userId: string;
  name: string;
  lat: string;
  lon: string;
  altitude: number;
};
// }}}

// login {{{
export type TRequestLogin = {
  nickname: string;
  password: string;
};
export type TRequestLogout = {
  loginToken: string;
};
export type TRequestRecover = {
  loginToken: string;
};
// }}}

// image {{{
export type TRequestUploadImage = {
  recordId: string;
};
export type TRequestDeleteImage = {
  imageId: string;
};
// }}}
