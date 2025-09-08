import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateEducationalUnitDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @MaxLength(150)
  subtitle: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  order: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  resources?: number;

  @IsString()
  @MaxLength(20)
  duration: string;

  @IsString()
  @MaxLength(20)
  level: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
