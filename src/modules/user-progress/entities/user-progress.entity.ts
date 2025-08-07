import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
  Check,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EducationalModule } from '../../educational-modules/entities/educational-module.entity';
import { UserProgressStatus } from '../enum/user-progress-status.enum';

@Entity('user_progress')
@Unique(['user', 'module'])
@Check(`status IN ('started', 'completed', 'certified')`)
@Check('score >= 0 AND score <= 100')
export class UserProgress {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => EducationalModule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moduleId' })
  module: EducationalModule;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'started',
  })
  status: UserProgressStatus;

  @Column({
    name: 'score',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  score?: number;

  @CreateDateColumn({
    name: 'lastAccessed',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastAccessed: Date;

  @Column({ name: 'completionDate', type: 'timestamptz', nullable: true })
  completionDate?: Date;

  @Column({ name: 'certificateUrl', type: 'text', nullable: true })
  certificateUrl?: string;
}
