import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
  imports: [TypeOrmModule.forFeature([Restaurant])],
})
export class RestaurantModule {}
