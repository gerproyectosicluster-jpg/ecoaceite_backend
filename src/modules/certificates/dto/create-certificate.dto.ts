import {
  IsUUID,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateCertificateDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  certificate_code: string;

  @IsDateString()
  @IsOptional()
  issue_date?: string;

  @IsDateString()
  @IsOptional()
  expiry_date?: string;

  @IsString()
  @IsNotEmpty()
  download_url: string;

  @IsString()
  @IsNotEmpty()
  verification_url: string;
}
