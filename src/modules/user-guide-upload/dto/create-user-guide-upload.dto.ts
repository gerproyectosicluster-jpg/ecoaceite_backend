import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserGuideUploadDto {
  @IsUUID()
  @IsNotEmpty()
  guide_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  upload_url?: string;
}
