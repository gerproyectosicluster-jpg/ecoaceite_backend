import { Module } from '@nestjs/common';
import { OilCollectionsService } from './oil-collections.service';
import { OilCollectionsController } from './oil-collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OilCollection } from './entities/oil-collection.entity';

@Module({
  controllers: [OilCollectionsController],
  providers: [OilCollectionsService],
  imports: [TypeOrmModule.forFeature([OilCollection])],
})
export class OilCollectionsModule {}
