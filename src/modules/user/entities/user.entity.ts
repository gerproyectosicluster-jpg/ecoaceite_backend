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
  `(role = 'admin' AND restaurantName IS NULL) OR (role = 'restaurant_owner' AND restaurantName IS NOT NULL)`,
)
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
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

  @Column({ name: 'passwordHash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({
    name: 'restaurantName',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  restaurantName?: string;

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

  @Column({ name: 'city', type: 'varchar', length: 50, nullable: true })
  city?: string;

  @Column({ name: 'verified', type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamptz' })
  updatedAt: Date;
}
