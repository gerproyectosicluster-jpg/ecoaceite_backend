import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EducationalGuide } from 'src/modules/educational-guide/entities/educational-guide.entity';
import { GuideStatus } from '../enum/guide_status.enum';

@Entity('user_guide_uploads')
export class UserGuideUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EducationalGuide, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guide_id' })
  guide: EducationalGuide;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  upload_url: string;

  @Column({
    type: 'enum',
    enum: GuideStatus,
    default: GuideStatus.PENDING_APPROVAL,
  })
  status: GuideStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  uploaded_at: Date;
}
