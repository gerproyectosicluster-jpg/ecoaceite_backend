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
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  certificateCode: string;

  @IsDateString()
  @IsOptional()
  issueDate?: string;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @IsString()
  @IsNotEmpty()
  downloadUrl: string;

  @IsString()
  @IsNotEmpty()
  verificationUrl: string;
}
