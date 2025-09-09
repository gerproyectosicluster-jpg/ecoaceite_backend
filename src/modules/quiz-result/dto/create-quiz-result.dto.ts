import { IsUUID, IsNotEmpty, Min, IsDecimal } from 'class-validator';

export class CreateQuizResultDto {
  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsDecimal()
  @Min(0)
  score: number;
}
