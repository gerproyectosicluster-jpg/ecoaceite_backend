import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
  Check,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { NotificationType } from '../enum/notification-type.enum';

@Entity('notifications')
@Check(`type IN ('collection', 'education', 'system')`)
export class Notification {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Index('idxUserId')
  user: User;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 20,
  })
  type: NotificationType;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'message', type: 'text' })
  message: string;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  is_read: boolean;

  @Column({ name: 'action_url', type: 'text', nullable: true })
  action_url?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;
}
