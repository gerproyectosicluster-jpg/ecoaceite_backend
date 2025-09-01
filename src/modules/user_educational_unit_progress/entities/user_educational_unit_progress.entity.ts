import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EducationalUnit } from '../../educational-unit/entities/educational-unit.entity';

@Entity('user_educational_unit_progress')
@Unique(['user', 'unit'])
export class UserEducationalUnitProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => EducationalUnit, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unit_id' })
  unit: EducationalUnit;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ type: 'boolean', default: false })
  completed: boolean;
}
