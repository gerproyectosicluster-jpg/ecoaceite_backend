import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('restaurants')
@Check('capacity > 0')
@Check('oilUsageEstimate > 0')
@Check(`category IN ('restaurant', 'cafeteria', 'food_truck', 'catering')`)
@Check(`certificationStatus IN ('pending', 'bronze', 'silver', 'gold')`)
export class Restaurant {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'capacity', type: 'int' })
  capacity: number;

  @Column({
    name: 'oilUsageEstimate',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  oilUsageEstimate: number;

  @Column({ name: 'wasteSchedule', type: 'jsonb' })
  wasteSchedule: any;

  @Column({ name: 'category', type: 'varchar', length: 20 })
  category: 'restaurant' | 'cafeteria' | 'food_truck' | 'catering';

  @Column({
    name: 'certificationStatus',
    type: 'varchar',
    length: 20,
    default: 'pending',
  })
  certificationStatus: 'pending' | 'bronze' | 'silver' | 'gold';

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;
}
