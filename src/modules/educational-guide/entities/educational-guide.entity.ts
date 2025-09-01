import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EducationalUnit } from '../../educational-unit/entities/educational-unit.entity';

@Entity('educational_guides')
export class EducationalGuide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EducationalUnit, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unit_id' })
  unit: EducationalUnit;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  duration?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  difficulty?: string;

  @Column({ type: 'boolean', default: true })
  downloadable: boolean;

  @Column({ type: 'text', nullable: true })
  download_url?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
