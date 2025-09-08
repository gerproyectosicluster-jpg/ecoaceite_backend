import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsInt,
  IsArray,
  IsDateString,
} from 'class-validator';

export class CreateEducationalModuleDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  type?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  number_questions?: number;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  duration?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  difficulty?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  requirements?: string;
}
