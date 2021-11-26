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
  OneToMany,
} from 'typeorm';

import UserEntity from './user.entity';
import ImageEntity from './image.entity';

/**
 * Record of user's visit
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
@Entity('records')
export default class RecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lat: string;

  @Column({ type: 'varchar' })
  lon: string;

  @Column({ type: 'numeric' })
  altitude: number;

  // relations

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ImageEntity, (image: ImageEntity) => image.record)
  images: ImageEntity[];

  // timestamps

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', select: false })
  deletedAt: Date;
}
