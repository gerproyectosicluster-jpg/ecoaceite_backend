import { Module } from '@nestjs/common';
import { EducationalModulesService } from './educational-modules.service';
import { EducationalModulesController } from './educational-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalModule } from './entities/educational-module.entity';

@Module({
  controllers: [EducationalModulesController],
  providers: [EducationalModulesService],
  imports: [TypeOrmModule.forFeature([EducationalModule])],
  exports: [EducationalModulesService, TypeOrmModule],
})
export class EducationalModulesModule {}
