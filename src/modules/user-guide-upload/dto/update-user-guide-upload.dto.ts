import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGuideUploadDto } from './create-user-guide-upload.dto';

export class UpdateUserGuideUploadDto extends PartialType(
  CreateUserGuideUploadDto,
) {}
