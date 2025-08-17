import { IsUUID, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateUserAnswerDto {
  @IsUUID()
  @IsNotEmpty()
  question_id: string;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsInt()
  @Min(0)
  selected_option: number;
}
