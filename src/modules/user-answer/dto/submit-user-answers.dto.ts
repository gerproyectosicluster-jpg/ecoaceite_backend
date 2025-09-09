import { IsUUID, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserAnswerDto } from './create-user-answer.dto';

export class SubmitUserAnswersDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserAnswerDto)
  answers: CreateUserAnswerDto[];
}
