import { Module } from '@nestjs/common';
import { EducationalGuideService } from './educational-guide.service';
import { EducationalGuideController } from './educational-guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalGuide } from './entities/educational-guide.entity';

@Module({
  controllers: [EducationalGuideController],
  providers: [EducationalGuideService],
  imports: [TypeOrmModule.forFeature([EducationalGuide])],
})
export class EducationalGuideModule {}
