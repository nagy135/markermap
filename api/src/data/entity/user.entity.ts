import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import RecordEntity from './record.entity';

/**
 * api User
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
@Entity('users')
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  // optional metadata

  @Column({ type: 'varchar', name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  // relations

  @OneToMany(() => RecordEntity, (record: RecordEntity) => record.user)
  records: RecordEntity[];

  // timestamps

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', select: false })
  deletedAt: Date;
}
