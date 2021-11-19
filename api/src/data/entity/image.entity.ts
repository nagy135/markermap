import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import RecordEntity from './record.entity';

/**
 * Image of record
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
@Entity('images')
export default class ImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  path: string;

  // relations

  @ManyToOne(() => RecordEntity, (record: RecordEntity) => record.id)
  @JoinColumn({ name: 'record_id' })
  record: RecordEntity;

  // timestamps

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', select: false })
  deletedAt: Date;
}
