import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '@entity/user.entity';
import { TRequestCreateUser } from '@ctypes/request';
import { hash } from '@utils/common';

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
    const { firstName, lastName, password } = data;

    const user = new UserEntity();

    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await hash(password);

    await user.save();
  }
}
