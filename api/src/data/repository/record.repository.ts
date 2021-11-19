import { EntityRepository, Repository } from 'typeorm';
import RecordEntity from '@entity/record.entity';

@EntityRepository(RecordEntity)
export default class RecordRepository extends Repository<RecordEntity> {
  /**
   * throws EntityNotFound
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async getById(id: string): Promise<RecordEntity> {
    return this.createQueryBuilder('self')
      .where('self.id = :id', { id })
      .getOneOrFail();
  }
}
