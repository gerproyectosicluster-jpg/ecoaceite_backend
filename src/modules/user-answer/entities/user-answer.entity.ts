import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Question } from 'src/modules/question/entities/question.entity';

@Entity('user_answers')
export class UserAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int' })
  selected_option: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  answered_at: Date;
}
