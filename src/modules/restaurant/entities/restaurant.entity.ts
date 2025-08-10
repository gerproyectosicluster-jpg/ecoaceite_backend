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
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'capacity', type: 'int' })
  capacity: number;

  @Column({
    name: 'oil_usage_estimate',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  oil_usage_estimate: number;

  @Column({ name: 'waste_schedule', type: 'jsonb' })
  waste_schedule: any;

  @Column({ name: 'category', type: 'varchar', length: 20 })
  category: 'restaurant' | 'cafeteria' | 'food_truck' | 'catering';

  @Column({
    name: 'certification_status',
    type: 'varchar',
    length: 20,
    default: 'pending',
  })
  certification_status: 'pending' | 'bronze' | 'silver' | 'gold';

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
