import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateQuestionDto {
  @IsUUID()
  @IsNotEmpty()
  module_id: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ArrayMinSize(5)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(5, { each: true })
  options: number[];
}
