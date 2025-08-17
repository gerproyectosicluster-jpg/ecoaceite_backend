import { EducationalModule } from 'src/modules/educational-modules/entities/educational-module.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EducationalModule, { onDelete: 'CASCADE' })
  module: EducationalModule;

  @Column({ type: 'text' })
  text: string; //question itself

  @Column({ type: 'jsonb' })
  options: string[]; //answer options
}
