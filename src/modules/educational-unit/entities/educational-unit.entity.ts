import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('educational_units')
export class EducationalUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'varchar', length: 150 })
  subtitle: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'int', default: 0 })
  resources: number;

  @Column({ type: 'varchar', length: 20 })
  duration: string;

  @Column({ type: 'varchar', length: 20 })
  level: string;
}
