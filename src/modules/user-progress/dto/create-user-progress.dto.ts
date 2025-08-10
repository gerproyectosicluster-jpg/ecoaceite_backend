import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsDateString,
  IsString,
} from 'class-validator';
import { UserProgressStatus } from '../enum/user-progress-status.enum';

export class CreateUserProgressDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsEnum(UserProgressStatus)
  @IsOptional()
  status?: UserProgressStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  @IsOptional()
  score?: number;

  @IsDateString()
  @IsOptional()
  last_accessed?: string;

  @IsDateString()
  @IsOptional()
  completion_date?: string;

  @IsString()
  @IsOptional()
  certificate_url?: string;
}
