import bcrypt from 'bcrypt';

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
