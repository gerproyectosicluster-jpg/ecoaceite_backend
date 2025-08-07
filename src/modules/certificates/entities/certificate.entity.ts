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
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => EducationalModule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moduleId' })
  module: EducationalModule;

  @ManyToOne(() => UserProgress, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'userId', referencedColumnName: 'user' },
    { name: 'moduleId', referencedColumnName: 'module' },
  ])
  userProgress: UserProgress;

  @Column({
    name: 'certificate_code',
    type: 'varchar',
    length: 20,
    unique: true,
  })
  certificateCode: string;

  @Column({ name: 'issueDate', type: 'date', default: () => 'CURRENT_DATE' })
  issueDate: string;

  @Column({ name: 'expiryDate', type: 'date', nullable: true })
  expiryDate?: string;

  @Column({ name: 'downloadUrl', type: 'text' })
  downloadUrl: string;

  @Column({ name: 'verificationUrl', type: 'text' })
  verificationUrl: string;
}
