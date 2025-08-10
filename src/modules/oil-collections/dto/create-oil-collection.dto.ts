import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { OilCollectionStatus } from '../enum/oil-collection-status.enum';

export class CreateOilCollectionDto {
  @IsUUID()
  @IsNotEmpty()
  restaurant_id: string;

  @IsUUID()
  @IsOptional()
  collector_id?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  liters_collected: number;

  @IsDateString()
  @IsOptional()
  collection_date?: string;

  @IsEnum(OilCollectionStatus)
  @IsOptional()
  status?: OilCollectionStatus;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  processor_company?: string;

  @IsString()
  @IsOptional()
  recycle_certificate_url?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
