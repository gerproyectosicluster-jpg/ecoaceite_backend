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
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  moduleId: string;

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
  lastAccessed?: string;

  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @IsString()
  @IsOptional()
  certificateUrl?: string;
}
