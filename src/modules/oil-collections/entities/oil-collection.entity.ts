import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { User } from '../../user/entities/user.entity';
import { OilCollectionStatus } from '../enum/oil-collection-status.enum';

@Entity('oil_collections')
@Check('liters_collected > 0')
@Check(`status IN ('scheduled', 'completed', 'cancelled')`)
@Check('collection_date >= created_at::date')
export class OilCollection {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'collector_id' })
  collector?: User;

  @Column({
    name: 'liters_collected',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  liters_collected: number;

  @Column({
    name: 'collection_date',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  collection_date: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'scheduled',
  })
  status: OilCollectionStatus;

  @Column({
    name: 'processor_company',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  processor_company?: string;

  @Column({ name: 'recycle_certificate_url', type: 'text', nullable: true })
  recycle_certificate_url?: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
