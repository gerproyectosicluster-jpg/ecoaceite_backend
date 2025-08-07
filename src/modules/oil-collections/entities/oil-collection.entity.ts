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
@Check('litersCollected > 0')
@Check(`status IN ('scheduled', 'completed', 'cancelled')`)
@Check('collectionDate >= createdAt::date')
export class OilCollection {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Restaurant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'collectorId' })
  collector?: User;

  @Column({
    name: 'litersCollected',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  litersCollected: number;

  @Column({
    name: 'collectionDate',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  collectionDate: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: 'scheduled',
  })
  status: OilCollectionStatus;

  @Column({
    name: 'processorCompany',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  processorCompany?: string;

  @Column({ name: 'recycleCertificateUrl', type: 'text', nullable: true })
  recycleCertificateUrl?: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;
}
