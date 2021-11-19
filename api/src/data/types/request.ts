import { TPaginationOptions } from './other';

// user {{{
export type TRequestGetUsers = TPaginationOptions;

export type TRequestGetUser = Record<string, string>;

export type TRequestCreateUser = {
  firstName: string;
  lastName: string;
  password: string;
};
// }}}

// record {{{
export type TRequestGetRecords = TPaginationOptions;

export type TRequestGetRecord = Record<string, string>;
// }}}
