import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EducationalModule } from '../../educational-modules/entities/educational-module.entity';
import { UserProgress } from '../../user-progress/entities/user-progress.entity';

@Entity('certificates')
@Unique(['certificateCode'])
export class Certificate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => EducationalModule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module: EducationalModule;

  @ManyToOne(() => UserProgress, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'user' },
    { name: 'module_id', referencedColumnName: 'module' },
  ])
  user_progress: UserProgress;

  @Column({
    name: 'certificate_code',
    type: 'varchar',
    length: 20,
    unique: true,
  })
  certificate_code: string;

  @Column({ name: 'issue_date', type: 'date', default: () => 'CURRENT_DATE' })
  issue_date: string;

  @Column({ name: 'expiry_date', type: 'date', nullable: true })
  expiry_date?: string;

  @Column({ name: 'download_url', type: 'text' })
  download_url: string;

  @Column({ name: 'verification_url', type: 'text' })
  verification_url: string;
}
