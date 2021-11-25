import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import ImageEntity from '@entity/image.entity';
import RecordRepository from './record.repository';

@EntityRepository(ImageEntity)
export default class ImageRepository extends Repository<ImageEntity> {
  /**
   * throws EntityNotFound
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async getById(id: string): Promise<ImageEntity> {
    return this.createQueryBuilder('self')
      .where('self.id = :id', { id })
      .getOneOrFail();
  }

  /**
   * creates new image
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  async make(name: string, path: string, recordId: string): Promise<void> {
    const image = new ImageEntity();

    image.name = name;
    image.path = path;
    image.record = await getCustomRepository(RecordRepository).getById(
      recordId
    );

    await image.save();
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
