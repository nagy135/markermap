import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '@entity/user.entity';

@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity> {
  /**
   * returns clean entity instance
   * throws EntityNotFound
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async getById(id: string): Promise<UserEntity> {
    console.log('================\n', 'id: ', id, '\n================');
    return this.createQueryBuilder('self')
      .where('self.id = :id', { id })
      .getOneOrFail();
  }
}
