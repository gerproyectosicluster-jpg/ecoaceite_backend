import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

import { GuideStatus } from 'src/modules/educational-guide/enum/guide_status.enum';
import { EducationalGuide } from 'src/modules/educational-guide/entities/educational-guide.entity';

@Entity('user_guide_progress')
@Unique(['user', 'guide'])
export class UserGuideProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => EducationalGuide, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guide_id' })
  guide: EducationalGuide;

  @Column({
    type: 'enum',
    enum: GuideStatus,
    default: GuideStatus.PENDING,
  })
  status: GuideStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
