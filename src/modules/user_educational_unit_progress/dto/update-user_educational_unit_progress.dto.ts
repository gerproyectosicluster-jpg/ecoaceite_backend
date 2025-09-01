import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEducationalUnitProgressDto } from './create-user_educational_unit_progress.dto';

export class UpdateUserEducationalUnitProgressDto extends PartialType(
  CreateUserEducationalUnitProgressDto,
) {}
