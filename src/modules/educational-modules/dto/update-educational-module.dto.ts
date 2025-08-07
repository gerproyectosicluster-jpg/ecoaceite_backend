import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalModuleDto } from './create-educational-module.dto';

export class UpdateEducationalModuleDto extends PartialType(
  CreateEducationalModuleDto,
) {}
