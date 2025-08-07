import { Module } from '@nestjs/common';
import { EducationalModulesService } from './educational-modules.service';
import { EducationalModulesController } from './educational-modules.controller';

@Module({
  controllers: [EducationalModulesController],
  providers: [EducationalModulesService],
})
export class EducationalModulesModule {}
