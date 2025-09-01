import { Module } from '@nestjs/common';
import { EducationalGuideService } from './educational-guide.service';
import { EducationalGuideController } from './educational-guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalGuide } from './entities/educational-guide.entity';
import { EducationalUnitModule } from '../educational-unit/educational-unit.module';

@Module({
  controllers: [EducationalGuideController],
  providers: [EducationalGuideService],
  imports: [
    TypeOrmModule.forFeature([EducationalGuide]),
    EducationalUnitModule,
  ],
  exports: [EducationalGuideService],
})
export class EducationalGuideModule {}
