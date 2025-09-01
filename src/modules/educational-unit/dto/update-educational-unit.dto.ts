import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalUnitDto } from './create-educational-unit.dto';

export class UpdateEducationalUnitDto extends PartialType(
  CreateEducationalUnitDto,
) {}
