import { Module, forwardRef } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, RestaurantService],
})
export class RestaurantModule {}
