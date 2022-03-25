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
      .leftJoinAndSelect('self.images', 'images')
      .getOneOrFail();
  }

  /**
   * creates new record
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async make(data: TRequestCreateRecord): Promise<string> {
    const { name, lat, lon, altitude, userId } = data;

    const record = new RecordEntity();

    record.name = name;
    record.lat = lat;
    record.lon = lon;
    record.altitude = altitude;
    record.userId = userId;
    await record.save();

    return record.id;
  }

  /**
   * delete by id
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }
}
