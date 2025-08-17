import { IsUUID, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateQuizResultDto {
  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsInt()
  @Min(0)
  score: number;
}
