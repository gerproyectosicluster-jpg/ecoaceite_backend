import { PartialType } from '@nestjs/mapped-types';
import { CreateOilCollectionDto } from './create-oil-collection.dto';

export class UpdateOilCollectionDto extends PartialType(
  CreateOilCollectionDto,
) {}
