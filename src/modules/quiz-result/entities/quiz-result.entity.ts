import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EducationalModule } from 'src/modules/educational-modules/entities/educational-module.entity';

@Entity('quiz_results')
export class QuizResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EducationalModule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module: EducationalModule;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'decimal' })
  score: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  completed_at: Date;
}
