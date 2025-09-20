import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsObject, IsNumber, IsString } from 'class-validator';

export class RestaurantUpdateDto {
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsString()
  category?:
    | 'restaurant'
    | 'cafeteria'
    | 'food_truck'
    | 'catering'
    | 'fast_food'
    | 'hotel_restaurant'
    | 'bar_grill'
    | 'other';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsObject()
  restaurant?: RestaurantUpdateDto;
}
