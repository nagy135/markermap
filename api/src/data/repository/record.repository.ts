import { EntityRepository, Repository } from 'typeorm';
import RecordEntity from '@entity/record.entity';
import { TRequestCreateRecord } from '@ctypes/request';

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

  async make(data: TRequestCreateRecord): Promise<void> {
    const { name, lat, lon } = data;

    const record = new RecordEntity();

    record.name = name;
    record.lat = lat;
    record.lon = lon;

    await record.save();
  }
}
