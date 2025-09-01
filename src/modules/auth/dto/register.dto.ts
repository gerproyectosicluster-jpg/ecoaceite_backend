import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';
import { CreateRestaurantDto } from 'src/modules/restaurant/dto/create-restaurant.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class RegisterDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ValidateNested()
  @Type(() => CreateRestaurantDto)
  @IsOptional()
  restaurant?: CreateRestaurantDto;
}
