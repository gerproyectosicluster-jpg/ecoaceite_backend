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
  @IsNotEmpty()
  @MaxLength(150)
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  order: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  resources?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  duration: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  level: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
