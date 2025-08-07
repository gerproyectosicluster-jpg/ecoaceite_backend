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
  restaurantId: string;

  @IsUUID()
  @IsOptional()
  collectorId?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  litersCollected: number;

  @IsDateString()
  @IsOptional()
  collectionDate?: string;

  @IsEnum(OilCollectionStatus)
  @IsOptional()
  status?: OilCollectionStatus;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  processorCompany?: string;

  @IsString()
  @IsOptional()
  recycleCertificateUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
