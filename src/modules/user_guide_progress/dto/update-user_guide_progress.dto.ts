import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGuideProgressDto } from './create-user_guide_progress.dto';

export class UpdateUserGuideProgressDto extends PartialType(
  CreateUserGuideProgressDto,
) {}
