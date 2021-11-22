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
export type TRequestGetRecords = TPaginationOptions;

export type TRequestGetRecord = Record<string, string>;

export type TRequestCreateRecord = {
  name: string;
  lat: string;
  lon: string;
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
// }}}
