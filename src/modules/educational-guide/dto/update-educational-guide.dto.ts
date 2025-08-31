import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalGuideDto } from './create-educational-guide.dto';

export class UpdateEducationalGuideDto extends PartialType(
  CreateEducationalGuideDto,
) {}
