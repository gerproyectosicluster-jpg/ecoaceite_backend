import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { GuideStatus } from '../enum/guide_status.enum';

export class CreateEducationalGuideDto {
  @IsUUID()
  @IsNotEmpty()
  unit_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  type?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  duration?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  difficulty?: string;

  @IsBoolean()
  @IsOptional()
  downloadable?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  guide_image: string;

  @IsString()
  @IsOptional()
  download_url?: string;

  @IsEnum(GuideStatus)
  @IsOptional()
  status?: GuideStatus;
}
