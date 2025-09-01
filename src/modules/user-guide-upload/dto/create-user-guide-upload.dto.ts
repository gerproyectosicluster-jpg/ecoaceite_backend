import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { GuideStatus } from '../enum/guide_status.enum';

export class CreateUserGuideUploadDto {
  @IsUUID()
  @IsNotEmpty()
  guide_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsOptional()
  upload_url?: string;

  @IsEnum(GuideStatus)
  @IsOptional()
  status?: GuideStatus;
}
