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
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  oilUsageEstimate: number;

  @IsObject()
  @IsNotEmpty()
  wasteSchedule: any;

  @IsEnum(RestaurantCategory)
  category: RestaurantCategory;

  @IsEnum(CertificationStatus)
  @IsOptional()
  certificationStatus?: CertificationStatus;
}
