import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateEducationalGuideDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  file_url: string;
}
