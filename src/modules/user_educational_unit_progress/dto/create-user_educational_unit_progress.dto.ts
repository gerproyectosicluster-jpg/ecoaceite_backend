import { IsUUID, IsInt, Min, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserEducationalUnitProgressDto {
  @IsUUID()
  user_id: string;

  @IsInt()
  unit_id: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  progress?: number;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
