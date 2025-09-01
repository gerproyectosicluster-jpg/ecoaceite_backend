import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
  IsObject,
  IsUUID,
} from 'class-validator';
import { CertificationStatus } from '../enums/certification_status.enum';
import { RestaurantCategory } from '../enums/restaurant_category.enum';

export class CreateRestaurantDto {
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNumber()
  @IsPositive()
  founding_year: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  oil_usage_estimate: number;

  @IsObject()
  @IsNotEmpty()
  waste_schedule: any;

  @IsEnum(RestaurantCategory)
  category: RestaurantCategory;

  @IsEnum(CertificationStatus)
  @IsOptional()
  certification_status?: CertificationStatus;
}
