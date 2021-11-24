import bcrypt from 'bcrypt';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import { TPaginationOptions, TPaginationResult } from '@ctypes/other';
import multer from 'multer';
import path from 'path';

/**
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const hash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, process.env.PASS_SALT as string);
};

/**
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const compareHash = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const randomString = (length: number): string => {
  let result = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const ccharsLen = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * ccharsLen));
  }
  return result;
};

/**
 * Returns paginates result of passed in query builder
 * Generic over T: Entity
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getPaginatedResult = async <T extends BaseEntity>(
  builder: SelectQueryBuilder<T>,
  paginationChanges: TPaginationOptions,
  requestData: TPaginationOptions
): Promise<TPaginationResult<T>> => {
  const paginationOptions: TPaginationOptions = {
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    direction: 'DESC',
  };

  Object.assign(paginationOptions, paginationChanges);
  Object.assign(paginationOptions, requestData);

  const { page, pageSize, sortBy, direction } = <TPaginationOptions>(
    paginationOptions
  );

  if (sortBy) {
    builder.orderBy(`self.${sortBy}`, direction);
  }

  const normalizedPageSize = Number(pageSize);
  const normalizedPage = Number(page);

  builder
    .offset((normalizedPage - 1) * normalizedPageSize)
    .limit(normalizedPageSize);

  const [items, total] = await builder.getManyAndCount();
  return {
    items,
    pagination: {
      total,
      pageSize: normalizedPageSize,
      current: normalizedPage,
    },
  };
};
