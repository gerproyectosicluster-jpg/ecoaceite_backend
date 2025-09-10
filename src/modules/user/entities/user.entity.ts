import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';

@Entity('users')
@Check(
  `(role = 'admin' AND restaurant_name IS NULL) OR (role = 'restaurant_owner' AND restaurant_name IS NOT NULL)`,
)
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  password_hash: string;

  @Column({
    name: 'restaurant_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  restaurant_name?: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 20,
  })
  role: 'admin' | 'restaurant_owner';

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address?: string;

  @Column({ name: 'latitude', type: 'decimal', nullable: true })
  latitude?: number;

  @Column({ name: 'longitude', type: 'decimal', nullable: true })
  longitude?: number;

  @Column({ name: 'city', type: 'varchar', length: 50, nullable: true })
  city?: string;

  @Column({ name: 'verified', type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;
}
