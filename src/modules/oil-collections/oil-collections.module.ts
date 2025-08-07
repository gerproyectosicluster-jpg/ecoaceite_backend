import { Module } from '@nestjs/common';
import { OilCollectionsService } from './oil-collections.service';
import { OilCollectionsController } from './oil-collections.controller';

@Module({
  controllers: [OilCollectionsController],
  providers: [OilCollectionsService],
})
export class OilCollectionsModule {}
