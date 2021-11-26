import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '@entity/user.entity';
import {
  TRequestCreateUser,
  TRequestLogin,
  TRequestLogout,
  TRequestRecover,
} from '@ctypes/request';
import { hash, compareHash, randomString } from '@utils/common';
import AppException from '@exception/app.exception';
import { ERR_APP_INCORRECT_PASSWORD } from '@utils/app-errors';

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
  /**
   * returns clean entity instance
   * throws EntityNotFound
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async getById(id: string): Promise<UserEntity> {
    return this.createQueryBuilder('self')
      .where('self.id = :id', { id })
      .getOneOrFail();
  }

  /**
   * creates new user with hashed password
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async make(data: TRequestCreateUser): Promise<void> {
    const { firstName, lastName, password, nickname } = data;

    const user = new UserEntity();

    user.firstName = firstName;
    user.lastName = lastName;
    user.nickname = nickname;
    user.password = await hash(password);

    await user.save();
  }

  /**
   * creates new user with hashed password
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async recovery(data: TRequestRecover): Promise<TLoginResponse> {
    const { loginToken } = data;

    const user = await this.findOneOrFail({ loginToken });
    return {
      id: user.id,
      login: user.nickname,
      loginToken,
    };
  }

  /**
   * deletes user by id
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }

  /**
   * Logs in user, returning loginToken to frontend
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async login(data: TRequestLogin): Promise<TLoginResponse> {
    const { nickname, password } = data;

    const user = await this.findOneOrFail({ nickname });

    if (!(await compareHash(password, user.password)))
      throw new AppException(ERR_APP_INCORRECT_PASSWORD);

    const loginToken = randomString(30);

    user.loginToken = loginToken;
    await user.save();

    return {
      id: user.id,
      login: user.nickname,
      loginToken,
    };
  }

  /**
   * Logs out user, removing loginToken
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async logout(data: TRequestLogout): Promise<void> {
    const user = await this.findOneOrFail({ loginToken: data.loginToken });
    user.loginToken = null;

    await user.save();
  }
}
