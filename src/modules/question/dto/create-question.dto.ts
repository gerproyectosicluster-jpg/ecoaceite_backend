import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreateQuestionDto {
  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options: string[];
}
