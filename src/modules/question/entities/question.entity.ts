import { EducationalModule } from 'src/modules/educational-modules/entities/educational-module.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EducationalModule, { onDelete: 'CASCADE' })
  module: EducationalModule;

  @Column({ type: 'varchar', length: 100 })
  section: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'jsonb', default: '[1,2,3,4,5]' })
  options: number[];
}
