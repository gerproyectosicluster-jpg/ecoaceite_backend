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

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  difficulty?: string;

  @Column({ type: 'int', nullable: true })
  guide_score?: number;

  @Column({ type: 'boolean', default: true })
  downloadable: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    default:
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65545f71-83d5-43ad-8e13-6a3c70e977ee.png',
  })
  guide_image: string;

  @Column({ type: 'text', nullable: true })
  download_url?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
