import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('educational_modules')
export class EducationalModule {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'type', type: 'varchar', length: 50, nullable: true })
  type?: string;

  @Column({ name: 'title', type: 'varchar', length: 150 })
  title: string;

  @Column({ name: 'subtitle', type: 'varchar', length: 150, nullable: true })
  subtitle?: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'number_questions',
    type: 'int',
    nullable: true,
    default: 25,
  })
  number_questions?: number;

  @Column({ name: 'duration', type: 'varchar', length: 20, nullable: true })
  duration?: string;

  @Column({ name: 'difficulty', type: 'varchar', length: 50, nullable: true })
  difficulty?: string;

  @Column({ name: 'benefits', type: 'text', array: true, nullable: true })
  benefits?: string[];

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate?: string;

  @Column({ name: 'requirements', type: 'text', nullable: true })
  requirements?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
